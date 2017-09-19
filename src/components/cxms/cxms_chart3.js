import echarts from "echarts";
function barChart(dom, dombg) {
	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;

	this._myChart = echarts.init(this._dom);

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid: {
			top: '15%',
			bottom: '15%'
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
					color: '#50a7bd',
					fontSize: 13,
					fontFamily: 'DIN MEDIUM'
				},
				interval:0,
			},
			splitLine: {
				show: false
			}
		},
		yAxis: [{
			name:'元      ',
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
		series: []
	};

	// this._myChart.setOption(this._option);
}

barChart.prototype = {
	constructor: barChart,

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

		var seriesItem = {
			type: type,
			data: yData,
			label:{
				normal:{
					show:true,
					position:'top',
					formatter: '{c}',
					textShadowColor:'#3197d9',
					textShadowBlur:10,
					textStyle:{
						fontSize:15,
						fontFamily:'DIN MEDIUM',
						color:'#66feff'
					}
				}
			},
			symbol: 'image://imgs/p3/barbg33.png',
			symbolMargin: '0%',
			barMinHeight: 1,
			barWidth: 22,
			symbolSize: ['100%', '20%'],
			symbolRepeat: true,
			animationEasing: 'line',
			animationDelay: function animationDelay(dataIndex, params) {
				return 800 * Math.sin(params.index / 60 * Math.PI / 2) + 100 * (dataIndex + 1);
			},
		}
		current._option.series.push(seriesItem);
		index++;
		current._option.xAxis.data = xData;
		current._myChart.setOption(current._option);
	}
}

module.exports = barChart;