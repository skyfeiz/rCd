function LineColumnChart(dom) {
	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;

	this._colorArray = ['#298bed', '#5a8ecf'];
	this._iconArray = ['icon.png', 'icon.png'];
	this._legendArray = ['legend3_1.png', 'legend3_2.png'];

	this._lineChart = echarts.init(this._dom);

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid:{
			top:'18%',
			bottom:'15%'
		},
		title: {
			left: '50%',
			text: '设备负荷曲线图',
			textStyle: {
				color: '#00d9fc',
				fontFamily: 'Microsoft Yahei',
				fontSize: 13
			},
			textAlign: 'center'
		},
	    legend: {
	    	right: 50,
	        // x: 'right',
	        data:[],
	        textStyle: {
	        	color: '#50a7bd',
            	fontSize: 13,
            	fontFamily: 'Microsoft Yahei'
	        },
	        itemGap: 20,
	        itemWidth:23,
			itemHeight:15,
	        selectedMode: false
	    },
	    xAxis: {
	    	axisLine: {
	    		lineStyle: {
	    			color: '#00dcff'
	    		}
	    	},
	    	axisTick: {
	    		lineStyle: {
	    			color: 'rgba(0,0,0,0)',
	    			width: 3
	    		},
	    		length: 3,
	    		alignWithLabel: true,
	    		boundaryGap: true
	    	},
	    	axisLabel: {
	    		textStyle: {
	    			color: 'rgba(0,0,0,0)',
	    			fontSize: 15,
	    			fontFamily: 'DIN MEDIUM'
	    		}
	    	},
	    	splitLine: {
	    		show: false
	    	}
	    },
	    yAxis: [{
	    	axisLine: {
	    		lineStyle: {
	    			color: '#00dcff'
	    		}
	    	},
	    	axisTick: {
	    		lineStyle: {
	    			color: '#cee1ff',
	    			width: 3
	    		},
	    		length: 3
	    	},
	    	axisLabel: {
	    		textStyle: {
	    			color: '#50a7bd',
	    			fontSize: 15,
	    			fontFamily: 'DIN MEDIUM'
	    		}
	    	},
	    	splitLine: {
	    		show: true,
	    		lineStyle: {
	    			color: 'rgba(80, 167, 189, 0.3)'
	    		}
	    	}
	    }, {
	    	position: 'right',
	    	axisLine: {
	    		lineStyle: {
	    			color: '#00dcff'
	    		}
	    	},
	    	axisTick: {
	    		lineStyle: {
	    			color: '#cee1ff',
	    			width: 3
	    		},
	    		length: 3
	    	},
	    	axisLabel: {
	    		textStyle: {
	    			color: '#50a7bd',
	    			fontSize: 15,
	    			fontFamily: 'DIN MEDIUM'
	    		}
	    	},
	    	splitLine: {
	    		show: false
	    	}
	    }],
	    series: [],
	    graphic: [{
            type: 'group',
            bounding: 'raw',
            left: '4%',
            top: '20%',
            z: 100,
            children: [{
	            	type: 'text',
                    left: 'center',
                    top: 'center',
                    z: 100,
                    style: {
                        fill: '#50a7bd',
                        textAlign: 'center',
                        text: '(%)',
                        font: '13px Microsoft YaHei'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            right: '5%',
            top: '30%',
            z: 100,
            children: [{
	            	type: 'text',
                    left: 'center',
                    top: 'center',
                    z: 100,
                    style: {
                        fill: '#50a7bd',
                        textAlign: 'center',
                        text: '负\n荷\n系\n数',
                        font: '13px Microsoft YaHei'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            right: '6%',
            bottom: '19%',
            z: 100,
            children: [{
	            	type: 'text',
                    left: 'center',
                    top: 'center',
                    z: 100,
                    style: {
                        fill: '#50a7bd',
                        textAlign: 'center',
                        text: '',
                        font: '13px Microsoft YaHei'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            right: '5%',
            bottom: '30%',
            z: 100,
            children: [{
	            	type: 'text',
                    left: 'center',
                    top: 'center',
                    z: 100,
                    style: {
                        fill: '#f5414e',
                        textAlign: 'center',
                        text: '负\n荷\n警\n戒\n线',
                        font: '13px Microsoft YaHei'
                    }
	            }
            ]
        }]
	};

	// this._lineChart.setOption(this._option);
}

LineColumnChart.prototype = {
	constructor: LineColumnChart,

	init: function() {

	},

	setConfig: function(value) {
		if (value == null) return;
		this._config = value;

		this.creationContent();
	},

	setDataProvider: function(value) {
		if (value == null || value.length == 0) return;
		this._dataProvider = value;

		this.creationContent();
	},

	creationContent: function() {
		var current = this;
		if (current._config == null || current._dataProvider == null) return;

		current._option.series.push({
			type: 'line',
			markLine: {
				data: [[{
					x: '10%',
					y: '50%'
				}, {
					x: '90%',
					y: '50%'
				}]],
				symbolSize: 0,
				silent: true,
				lineStyle: {
					normal: {
						color: '#f5414e',
						type: 'solid'
					}
				}
			}
		});

		var legendArr = [];

		var index = 0;
		var xData = [];
		for (var key in current._config) {
			if (key == 'xField') {
				current._dataProvider.map(function(item, index) {
					xData.push(item[current._config[key]]);
				});
			} else {
				var yData = [];
				current._dataProvider.map(function(item, index) {
					yData.push(item[current._config[key]]);
				});

				var type = 'bar';
				var yAxisIndex = 0;
				if (key == 'y2Field') {
					type = 'line';
					yAxisIndex = 1;
				}

				var colorIndex = index % current._colorArray.length;
				var seriesItem = {
					name: current._config[key],
					type: type,
					yAxisIndex: yAxisIndex,
					data: yData,
					lineStyle: {
						normal: {
							color: current._colorArray[colorIndex]
						}
					},
					itemStyle: {
						normal: {
							color: 'rgba(0, 217, 252, 0.4)',
							borderColor: '#66feff',
							shadowBlur: -10,
							shadowColor: 'rgba(0, 217, 252, 1)'
						}
					},
					barWidth: 26,
					symbol: 'image://imgs/p4/' + current._iconArray[colorIndex],
					symbolSize: 20,
					animationDuration:4000,
					animationDelay: function animationDelay(dataIndex) {
						if (!dataIndex) {return}
						return 4000*Math.sin(dataIndex/60*Math.PI/2);
					}
				};

				current._option.series.push(seriesItem);

				index++;

				legendArr.push({
					name: current._config[key],
					icon: 'image://imgs/p4/' + current._legendArray[colorIndex]
				});
			}
		}

		current._option.xAxis.data = xData;
		current._option.legend.data = legendArr;
		current._lineChart.setOption(current._option);
	},

	resize: function() {

	},

	dispose: function() {

	}
}

module.exports = LineColumnChart;