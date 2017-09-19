import echarts from "echarts";
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

	var sX = 48;
	var disX = 49.5;
	for (var i = 0; i < 8; i++) {
		points.push({
			type: 'image',
			style: {
				x: sX + i * disX,
				y: -7,
				image: 'imgs/p3/xaixspoint.png',
				width: 5,
				height: 5
			}
		});
	}

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid: {
			top: '15%',
			bottom: '26%'
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
			itemWidth: 25,
			itemHeight: 18,
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
				interval:0,
				rotate:45,
				margin: 10
			},
			splitLine: {
				show: false
			}
		},
		yAxis: [{
			name:'(%)    ',
			nameGap:10,
			nameTextStyle:{
				color: '#50a7bd',
				fontSize: 15,
				fontFamily: 'DIN MEDIUM'
			},
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
		}],
		series: [],
		graphic: [{
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
		if (current._dataProvider == null) return;

		current._option.series.push();

		var legendArr = [];

		var index = 0;
		var xData = [];

		var yData = [];
		current._dataProvider.map(function(item, index) {
			yData.push(item.value);
			xData.push(item.name)
		});
		var type = 'pictorialBar';
		var yAxisIndex = 0;

		var colorIndex = index % current._colorArray.length;
		var seriesItem = {
			type: type,
			data: yData,
			markPoint:{
				symbol:'image://imgs/p3/labelline.png',
				symbolSize:[5,25],
				symbolOffset:[0,0],
				data:yData.map(function(item,i){
					return {
						coord:[i,item],
						symbolOffset:[0,10],
						label:{
							normal:{
								offset:[0,-20],
								color:'#66feff',
								fontSize:15,
								fontFamily:'DIN MEDIUM',
								textShadowBlur:10,
								textShadowColor:'#3197d9'
							}
						}
					}
				})
			},
			symbol: 'image://imgs/p3/bar01.png',
			symbolMargin: '-40%',
			barMinHeight: 14,
			barWidth: 28,
			symbolOffset: [0, '100%'],
			symbolSize: ['100%', '50%'],
			symbolRepeat: true,
			animationEasing: 'line',
			animationDelay: function animationDelay(dataIndex, params) {
				return 800 * Math.sin(params.index / 60 * Math.PI / 2) + 100 * (dataIndex + 1);
			},
		}
		current._option.series.push(seriesItem);
		index++;
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