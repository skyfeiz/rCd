function LineColumnChart3d(dom, dombg) {
	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;

	this._colorArray = ['#298bed', '#5a8ecf'];
	this._iconArray = ['icon2.png', 'icon2.png'];
	this._legendArray = ['legend4_1.png', 'legend4_2.png'];

	// 标线的Y位置   从上到下 0% ~ 100%
	this.markLine = '40%';

	this._lineChart = echarts.init(this._dom);

	var points = [];

	var sX = 68;
	var disX = 68;
	for (var i = 0; i < 9; i++) {
		points.push({
			type: 'image',
			style: {
				x: sX+i*disX,
				y: -3,
				image: 'imgs/p4/xaixspoint.png',
				width: 5,
				height: 5
			}
		});
	}

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid: {
			top: '18%',
			bottom: '25%'
		},
		title: {
			left: '50%',
			text: '11TC10203895超载日统计图',
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
			data: [],
			textStyle: {
				color: '#50a7bd',
				fontSize: 13,
				fontFamily: 'Microsoft Yahei'
			},
			itemGap: 20,
			itemWidth:25,
			itemHeight:18,
			selectedMode: false
		},
		xAxis: {
			offset: 10,
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
					color: '#50a7bd',
					fontSize: 13,
	    			fontFamily: 'DIN MEDIUM'
				},
				margin: 15
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
					text: '重\n量\n(吨)',
					font: '13px Microsoft YaHei'
				}
			}]
		}, {
			type: 'group',
			bounding: 'raw',
			right: '5%',
			top: '32%',
			z: 100,
			children: [{
				type: 'text',
				left: 'center',
				top: 'center',
				z: 100,
				style: {
					fill: '#50a7bd',
					textAlign: 'center',
					text: '最\n大\n负\n荷\n系\n数',
					font: '13px Microsoft YaHei'
				}
			}]
		}, {
			type: 'group',
			bounding: 'raw',
			right: '6%',
			bottom: '12%',
			z: 100,
			children: [{
				type: 'text',
				left: 'center',
				top: 'center',
				z: 100,
				style: {
					fill: '#50a7bd',
					textAlign: 'center',
					text: '日期',
					font: '13px Microsoft YaHei'
				}
			}]
		}, {
			type: 'group',
			bounding: 'raw',
			right: '5%',
			bottom: '32%',
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
			}]
		}, {
			type: 'group',
			bounding: 'raw',
			left: '10%',
			bottom: '24.5%',
			z: 100,
			children: [{
				type: 'line',
				shape: {
					x1: -40,
					y1: 40,
					x2: 40,
					y2: -40
				},
				style: {
					stroke: 'rgba(0,220,255,0.5)'
				}
			}].concat(points)
		}]
	};

	// this._lineChart.setOption(this._option);
}

LineColumnChart3d.prototype = {
	constructor: LineColumnChart3d,

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
				data: [
					[{
						x: '10%',
						y: this.markLine
					}, {
						x: '90%',
						y: this.markLine
					}]
				],
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
				var type = 'pictorialBar';
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
					symbolSize: 20
				};
				if (key == 'y1Field') {
					seriesItem = {
						name: current._config[key],
						type: type,
						yAxisIndex: yAxisIndex,
						data: yData.map(function(n) {
							return n * 1.1;
						}),
						symbol: 'image://imgs/p4/bar01.png',
						symbolMargin: '-40%',
						barMinHeight: 14,
						barWidth: 34,
						symbolOffset: [0, '100%'],
						symbolSize: ['100%', '50%'],
						symbolRepeat: true,
						animationEasing: 'line',
						animationDelay: function animationDelay(dataIndex, params) {
							return 1600*Math.sin(params.index/60*Math.PI/2)+200*(dataIndex+1);
						},
					}
				}
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

module.exports = LineColumnChart3d;