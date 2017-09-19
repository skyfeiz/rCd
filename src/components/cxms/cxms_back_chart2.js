import zrender from "zrender";
import LinearGradient from "zrender/lib/graphic/LinearGradient.js";
import GroupShape from "zrender/lib/container/Group";
import LineShape from "zrender/lib/graphic/shape/Line.js";
import RectShape from "zrender/lib/graphic/shape/Rect.js";
import CircleShape from "zrender/lib/graphic/shape/Circle.js";
import echarts from "echarts";
function barChart(dom, dombg) {
	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;
	let dom1 = $(dom).clone(false)[0];
	$(dom1).attr('id','');
	$(dom).before($(dom1));
	this.zr = zrender.init(dom1);
	this._myChart = echarts.init(this._dom);

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid: {
			top: '10%',
			left:'5%',
			right:'5%',
			bottom: '10%'
		},
		xAxis: {
			axisLine: {
				lineStyle: {
					color: '#00dcff'
				}
			},
			axisTick: {
				lineStyle: {
					color:'#fff'
				},
				length: 2,
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
				rotate:30,
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
			min:60,
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
				show: false,
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
						fontSize:14,
						color:'#fff'
					}
				}
			},
			symbol: 'image://imgs/p3/barbg33.png',
			symbolMargin: '0%',
			barMinHeight: 4,
			barWidth: 23,
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
		this.createBg(xData.length);
		current._myChart.setOption(current._option);
	},
	createBg:function(n){
		let bgcolor = 'rgba(25,170,231,1)';
		// 原点
		let vec2 = {
			x:31,
			y:306
		};
		let circle000 = new CircleShape({
			shape:{
				cx:vec2.x,
				cy:vec2.y,
				r:5
			},
			style:{
				fill:'red'
			}
		})
		// this.zr.add(circle000);
		// 总宽度
		let W = 548;
		// 单个bg的宽度
		let perW = W/n*2/3;
		let perH = 274;
		// 间距
		let disX = perW/2;

		// 单个箭头的高度
		let unitH = 12;
		// 单个箭头的间距
		let unitDisH = 5;

		let perLen = perH/unitDisH;
		for (let j = 0; j < n; j++) {
			let dashLine = new LineShape({
				shape:{
					x1:vec2.x+disX*1.5+j*disX*3,
					y1:vec2.y-perH,
					x2:vec2.x+disX*1.5+j*disX*3,
					y2:vec2.y
				},
				style:{
					stroke:'rgba(0,220,255,0.5)',
					lineDash: [2, 2]
				}
			})
			this.zr.add(dashLine);
		}
	}
}

module.exports = barChart;