function ScatterChart(dom) {
	this._dom = dom;
	this._colorArray = ['rgba(67, 207, 110, 1)', 'rgba(183, 57, 65, 1)', 'rgba(90, 142, 207, 1)', 'rgba(145, 251, 235, 1)', 'rgba(0, 220, 255, 1)', 'rgba(41, 139, 237, 1)'];
	this._borderColorArray = ['rgba(67, 207, 110, 0.1)', 'rgba(183, 57, 65, 0.1)', 'rgba(90, 142, 207, 0.1)', 'rgba(222, 160, 39, 0.1)', 'rgba(0, 220, 255, 0.1)', 'rgba(41, 139, 237, 0.1)'];

	this.areaBg = ['rgba(67,207,110,0.1)','rgba(126, 178, 230, 0.1)','rgba(0, 220, 255, 0.1)','rgba(183, 57, 65, 0.1)'];
	this._scatterChart = echarts.init(this._dom);

	// x,y轴分割线的值；
	this.markX = 1.2;
	this.markY = 2;

	this._option = {
		// backgroundColor: 'rgba(72, 118, 174, 0.1)',
		grid: {
			left: '13.5%',
			right:'15%',
			top: '15%',
			bottom:'10%'
		},
		legend: {
			top: '4%',
			x: 'center',
			data: [],
			textStyle: {
				color: '#50a7bd',
				fontSize: 13,
				fontFamily: 'Microsoft Yahei'
			},
			itemGap: 20,
			itemWidth:10,
			itemHeight:10,
			selectedMode: false
		},
		xAxis: {
			name: '(模块负载率)',
			nameTextStyle: {
				color: '#50a7bd',
				fontSize: 13
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
				show: false
			}
		},
		yAxis: {
			name: '(次/每年)',
			nameTextStyle: {
				color: '#50a7bd',
				fontSize: 13
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
				show: false
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: 'rgba(72,118,175,0.1)'
				}
			}
		},
		series: [],
		/*graphic: [{
			type: 'group',
			bounding: 'raw',
			right: '30%',
			top: '21%',
			z: 100,
			children: [{
				type: 'image',
				left: 'center',
				top: -50,
				style: {
					image: './imgs/p4/leadTop.png'
				}
			}, {
				type: 'text',
				left: 0,
				top: -75,
				z: 100,
				style: {
					fill: '#fff',
					text: '重点设计改进',
					font: '18px Microsoft YaHei',
					shadowBlur: 10,
					shadowColor: '#3197d9'
				}
			}]
		}, {
			type: 'group',
			bounding: 'raw',
			left: '30%',
			top: '21%',
			z: 100,
			children: [{
				type: 'image',
				left: 'center',
				top: -50,
				style: {
					image: './imgs/p4/leadTop.png'
				}
			}, {
				type: 'text',
				left: -20,
				top: -75,
				z: 100,
				style: {
					fill: '#fff',
					text: '修改设计/供应商替换',
					font: '18px Microsoft YaHei',
					shadowBlur: 10,
					shadowColor: '#3197d9'
				}
			}]
		}, {
			type: 'group',
			bounding: 'raw',
			left: '25%',
			bottom: '11%',
			z: 100,
			children: [{
				type: 'image',
				left: 'center',
				top: -50,
				style: {
					image: './imgs/p4/leadBottom.png'
				}
			}, {
				type: 'text',
				left: -30,
				bottom: -25,
				z: 100,
				style: {
					fill: '#fff',
					text: '降本设计',
					font: '18px Microsoft YaHei',
					shadowBlur: 10,
					shadowColor: '#3197d9'
				}
			}]
		}, {
			type: 'group',
			bounding: 'raw',
			right: '30%',
			bottom: '11%',
			z: 100,
			children: [{
				type: 'image',
				left: 'center',
				top: -50,
				style: {
					image: './imgs/p4/leadBottom.png'
				}
			}, {
				type: 'text',
				left: -30,
				bottom: -25,
				z: 100,
				style: {
					fill: '#fff',
					text: '保持设计',
					font: '18px Microsoft YaHei',
					shadowBlur: 10,
					shadowColor: '#3197d9'
				}
			}]
		}]*/
	};

	// this._scatterChart.setOption(this._option);
}

ScatterChart.prototype = {
	constructor: ScatterChart,

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

		// 统计数据中的最大半径值，为了下面设置borderWidth时使用
		var maxR = 0;
		current._dataProvider.map(function(item) {
			maxR = maxR > item[current._config.rField] ? maxR : item[current._config.rField];
		});

		var legendArr = [];
		var seriesArr = [];
		current._dataProvider.map(function(item, index) {
			var name = item[current._config.nameField];
			var xNum = item[current._config.xField];
			var yNum = item[current._config.yField];
			var rNum = item[current._config.rField];

			var legendItem = {
				name: name,
				icon: 'circle'
			};
			legendArr.push(legendItem);

			var colorIndex = index % current._colorArray.length;
			var borderWidth = 20 * rNum / maxR;

			var seriesItem = {
				data: [
					[xNum, yNum, rNum, name]
				],
				type: 'scatter',
				name: name,
				symbolSize: function(params) {
					return params[2] / 3.5;
				},
				itemStyle: {
					normal: {
						color: current._colorArray[colorIndex],
						borderColor: current._borderColorArray[colorIndex],
						borderWidth: borderWidth,
						shadowBlur: 10,
						shadowColor: current._borderColorArray[colorIndex]
					}
				}
			};

			seriesArr.push(seriesItem);
		});

		seriesArr.push({
			type: 'scatter',
			markLine: {
				label:{
					normal:{
						show:false
					}
				},
				data : [
                    { xAxis: this.markX },
                    {yAxis:this.markY}
                ],
				symbolSize: 0,
				silent: true,
				lineStyle: {
					normal: {
						color: '#146077',
						type: 'solid'
					}
				}
			},
			markArea:{
				silent:true,
				data:[[{
					name:'降本设计',
					xAxis:0,
					yAxis:0,
					itemStyle:{
						normal:{
							color:this.areaBg[0]
						}
					},
					label:{
						normal:{
							position:['2%','90%'],
							textStyle:{
								color:'#00dcff',
								fontSize:16
							}
						}
					}
				},{
					xAxis:this.markX,
					yAxis:this.markY
				}],[{
					name:'修改设计/\n供应商替换',
					xAxis:0,
					yAxis:this.markY,
					itemStyle:{
						normal:{
							color:this.areaBg[1]
						}
					},
					label:{
						normal:{
							position:['2%','86%'],
							textStyle:{
								color:'#00dcff',
								fontSize:16
							}
						}
					}
				},{
					xAxis:this.markX,
					yAxis:'max'
				}],[{
					name:'保持设计',
					xAxis:this.markX,
					yAxis:0,
					itemStyle:{
						normal:{
							color:this.areaBg[2]
						}
					},
					label:{
						normal:{
							position:['2%','90%'],
							textStyle:{
								color:'#00dcff',
								fontSize:16
							}
						}
					}
				},{
					xAxis:'max',
					yAxis:this.markY
				}],[{
					name:'重点设计改进',
					xAxis:this.markX,
					yAxis:this.markY,
					itemStyle:{
						normal:{
							color:this.areaBg[3]
						}
					},
					label:{
						normal:{
							position:['2%','90%'],
							textStyle:{
								color:'#00dcff',
								fontSize:16
							}
						}
					}
				},{
					xAxis:'max',
					yAxis:'min'
				}]]
			}
		});

		current._option.legend.data = legendArr;

		current._option.series = seriesArr;
		current._scatterChart.setOption(current._option);
	},

	resize: function() {

	},

	dispose: function() {

	}
}

module.exports = ScatterChart;