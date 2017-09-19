class XhjBox1Chart1 {
	constructor(dom) {
		this.myChart = echarts.init(dom);

		this.option = {
			grid: {
				left: 0,
				top: 0,
				right: 0,
				bottom: '2%'
			},
			xAxis: {
				type: 'category',
				data: [],
				axisLable: {
					textStyle: {
						color: '#50a7bd'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#00dcff'
					}
				},
				axisTick:{
					alignWithLabel:true,
					length:2,
					lineStyle:{
						color:'#fff'
					}
				}
			},
			yAxis:{
				show:false,
				type:'value'
			},
			series:[{
				name:'展示数据',
				type:'bar',
				barWidth:27,
				itemStyle:{
					normal:{
						color:'#66feff'
					}
				},
				data:[]
			},{
				name:'柱状图阴影',
				type:'bar',
				barWidth:40,
				barGap:'-112%',
				itemStyle:{
					normal:{
						color:'rgba(43,73,108,0.4)'
					}
				},
				data:[]
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
		for (var i = 0; i < len; i++) {
			this.option.series[0].data.push(this._dataProvider[i].value);
			this.option.xAxis.data.push(this._dataProvider[i].name)
			if (numMax<this._dataProvider[i].value) {
				numMax = this._dataProvider[i].value;
			}
		}

		for (var i = 0; i < len; i++) {
			this.option.series[1].data.push(numMax*1.2);
		}

		this.option.yAxis.max = numMax*1.2;

		this.myChart.setOption(this.option);
	}
}
module.exports = XhjBox1Chart1;