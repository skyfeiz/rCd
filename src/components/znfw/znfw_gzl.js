class ZnfwGzl {
	constructor(dom) {
		this._myChart = echarts.init(dom);
	}

	setConfig(value) {
		this._config = value;
	}

	setDataProvider(value) {
		this._dataProvider = value;
		this.creationContent();
	}

	creationContent() {

		let seriesNameArr = [];
		let xDataJson = {};
		let xData = [];
		let data = [];
		let imgArr = ['imgs/p1/bar01.png', 'imgs/p1/bar02.png'];
		for (let i = 0; i < this._dataProvider.length; i++) {
			let item = this._dataProvider[i];
			seriesNameArr.push(item.seriesName);
			let arr = [];
			for (let j = 0; j < item.dataList.length; j++) {
				xDataJson[item.dataList[j].name] = 1;
				arr.push(item.dataList[j].value)
			}
			data.push(arr);
		}

		for (let key in xDataJson) {
			xData.push(key);
		}

		let legendData = [];
        for (let i = 0; i < seriesNameArr.length; i++) {
            legendData.push({
                name:seriesNameArr[i],
                icon:'rect'
            });
        }

		let option = {
			color: ['#d0e2ff', '#66ffff'],
			grid: {
				left: '8%',
				right: '3%',
				bottom: '15%',
			},
			xAxis: {
				type: 'category',
				data: xData,
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#50a7bd',
						fontFamily: 'DIN MEDIUM'
					},
                    margin:26
				},
                offset:10
			},
			legend: {
				top: '7%',
				itemWidth: 15,
				itemHeight: 6,
				textStyle: {
					color: '#50a7bd',
					fontSize: 14
				},
				selectedMode:false,
				data: legendData
			},
			yAxis: {
				type: 'value',
                offset:12,
                splitLine:{
                    show:false,
                },
                name:'(‰)     ',
                nameGap:7,
                nameTextStyle:{
                    color:'#66ffff'
                },
                axisTick: {
                    alignWithLabel: true,
                    length: 2,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#66ffff',
						fontFamily: 'DIN MEDIUM'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#00dcff'
                    }
                }

			},
			series: [{
				name: seriesNameArr[0],
				type: 'pictorialBar',
				symbol: 'image://' + imgArr[0],
				symbolMargin: '-30%',
				barWidth: 35,
                symbolOffset:[0,'100%'],
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter: function formatter(n) {
							return n.value + '‰';
						},
						textStyle: {
							color: '#fff',
							fontFamily: 'DIN MEDIUM',
							fontSize:16
						}
					}
				},
				animationEasing: 'line',
				animationDelay: function animationDelay(dataIndex, params) {
					return params.index * 40;
				},
				data: data[0],
				symbolRepeat: true
			}, {
				name: seriesNameArr[1],
				type: 'pictorialBar',
				symbol: 'image://' + imgArr[1],
				animationEasing: 'line',
				symbolMargin: '-30%',
				barWidth: 36,
				barGap: '0%',
                symbolOffset:[0,'100%'],
				label: {
					normal: {
						show: true,
						position: 'top',
						formatter: function formatter(n) {
							return n.value + '‰';
						},
						textStyle: {
							color: '#fff',
							fontFamily: 'DIN MEDIUM',
							fontSize:16
						}
					}
				},
				animationDelay: function animationDelay(dataIndex, params) {
					return 1600*Math.sin(params.index/60*Math.PI/2)+200*(dataIndex+1);
				},
				data: data[1],
				symbolRepeat: true
			}]
		};
		this._myChart.setOption(option);
	}
}

module.exports = ZnfwGzl;