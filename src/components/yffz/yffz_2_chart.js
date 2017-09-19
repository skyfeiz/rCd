function LineChart(dom) {
	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;

	this._colorArray = ['#298bed', '#00dcff', '#7eb2e6'];
	this._areaColorArray = ['rgba(41, 139, 237, 0.2)', 'rgba(0, 220, 255, 0.2)', 'rgba(206, 225, 255, 0.2)'];
	this._iconArray = ['gear1.png', 'gear2.png', 'gear3.png'];
	this._legendArray = ['legend1.png', 'legend2.png', 'legend3.png'];

	this._lineChart = echarts.init(this._dom);

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid:{
			left:'14%',
			right:'14%',
			top:'15%',
			bottom:'15%'
		},
		title: {
			left: '50%',
			text: '08QC02510158负荷曲线图',
			textStyle: {
				color: '#00d9fc',
				fontFamily: 'Microsoft Yahei',
				fontSize: 13
			},
			textAlign: 'center'
		},
	    legend: {
	    	right: 20,
	        // x: 'right',
	        data:[],
	        textStyle: {
	        	color: '#50a7bd',
            	fontSize: 13,
            	fontFamily: 'Microsoft Yahei'
	        },
	        itemGap: 20,
	        itemWidth:15,
	        itemHeight:3,
	        selectedMode: false
	    },
	    xAxis: {
	    	axisLine: {
	    		show:false,
	    		lineStyle: {
	    			color: '#00dcff'
	    		}
	    	},
	    	boundaryGap: false,
	    	axisTick: {
	    		lineStyle: {
	    			color: '#cee1ff',
	    			width: 3
	    		},
	    		length: 3,
	    		alignWithLabel: true,
	    		boundaryGap: true
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
	    },
	    yAxis: [{
	    	axisLine: {
	    		lineStyle: {
	    			color: '#00dcff'
	    		}
	    	},
	    	offset:30,
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
	    	offset:30,
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
                        text: '重\n量\n(吨)',
                        font: '13px Microsoft YaHei'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            right: '5%',
            top: '24%',
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
            bottom: '15%',
            z: 100,
            children: [{
	            	type: 'text',
                    left: 'center',
                    top: 'center',
                    z: 100,
                    style: {
                        fill: '#50a7bd',
                        textAlign: 'center',
                        text: '时间',
                        font: '13px Microsoft YaHei'
                    }
	            }
            ]
        }, {
            type: 'group',
            bounding: 'raw',
            right: '5%',
            bottom: '48%',
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
        },{
        	type:'line',
        	left:'10%',
        	bottom:'14%',
        	shape:{
        		x1:0,
        		y1:0,
        		x2:670,
        		y2:0
        	},
        	style:{
        		stroke:'#00dcff',
        		lineWidth:1
        	}
        }]
	};

	// this._lineChart.setOption(this._option);
}

LineChart.prototype = {
	constructor: LineChart,

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

				var yAxisIndex = 0;
				if (key == 'y3Field') {
					yAxisIndex = 1;
				}

				var colorIndex = index % current._colorArray.length;
				var seriesItem = {
					name: current._config[key],
					type: 'line',
					yAxisIndex: yAxisIndex,
					data: yData,
					lineStyle: {
						normal: {
							color: current._colorArray[colorIndex]
						}
					},
					areaStyle: {
						normal: {
							color: current._areaColorArray[colorIndex]
						}
					},

					symbol: 'image://imgs/p4/' + current._iconArray[colorIndex],
					symbolSize: 20
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

module.exports = LineChart;