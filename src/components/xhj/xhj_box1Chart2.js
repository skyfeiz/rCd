class XhjBox1Chart1 {
	constructor(dom) {
		this.myChart = echarts.init(dom);

		this.option = {
			grid: {
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			},
			xAxis: {
				type: 'value',
				show: false
			},
			yAxis: {
				type: 'category',
				show: false,
				data: []
			},
			series: [{
				name: '柱状图阴影1',
				type: 'pictorialBar',
				barWidth: 10,
				symbol: 'rect',
				symbolSize: ['20%', '100%'],
				symbolRepeat: true,
				symbolMargin: 1,
				silent: true,
				animation: false,
				itemStyle: {
					normal: {
						color: 'rgba(43,73,108,1)'
					}
				},
				data: []
			}, {
				name: '柱状图阴影2',
				type: 'bar',
				barWidth: 10,
				barGap: '-100%',
				silent: true,
				animation: false,
				itemStyle: {
					normal: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 0,
							colorStops: [{
								offset: 0,
								color: 'rgba(2,12,27,1)'
							}, {
								offset: 1,
								color: 'rgba(2,12,27,0)'
							}],
							globalCoord: false
						}
					}
				},
				data: []
			}, {
				name: '展示数据',
				type: 'bar',
				barWidth: 12,
				barGap: '-100%',
				label: {
					normal: {
						show: true,
						position: 'insideLeft',
						offset: [-4, -2],
						formatter: function(param) {
							return param.name;
						},
						textStyle: {
							color: '#50a7bd',
							fontSize: 10
						}
					}
				},
				itemStyle: {
					normal: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 1,
							y2: 0,
							colorStops: [{
								offset: 0,
								color: '#0f2c50',
							}, {
								offset: 0.17,
								color: '#0f2c50',
							}, {
								offset: 0.69,
								color: '#29a0b9',
							}, {
								offset: 1,
								color: '#66feff',
							}],
							globalCoord: false
						},
						barBorderRadius: [0, 6, 6, 0]
					}
				},
				data: []
			}]

		}
	}

	setConfig(value) {
		if (value == null) return;
		this._config = value;
	}

	setDataProvider(value) {
		if (value == null || value.length == 0) return;
		this._dataProvider = value;

		this.creationContent();
	}

	creationContent() {
		if (this._dataProvider == null) return;
		let len = this._dataProvider.length;
		let numMax = 0;

		this._dataProvider.sort(function(a, b) {
			return a.value - b.value;
		})
		for (var i = 0; i < len; i++) {
			this.option.series[2].data.push(this._dataProvider[i].value);
			this.option.yAxis.data.push(this._dataProvider[i].name)
			if (numMax < this._dataProvider[i].value) {
				numMax = this._dataProvider[i].value;
			}
		}

		for (var i = 0; i < len; i++) {
			this.option.series[0].data.push(numMax * 1.1);
			this.option.series[1].data.push(numMax * 1.1);
		}

		this.option.xAxis.max = numMax * 1.1;

		this.myChart.setOption(this.option);
	}
}
module.exports = XhjBox1Chart1;