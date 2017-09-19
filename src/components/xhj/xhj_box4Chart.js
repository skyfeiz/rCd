import zrender from "zrender";
import LinearGradient from "zrender/lib/graphic/LinearGradient.js";
import GroupShape from "zrender/lib/container/Group";
import LineShape from"zrender/lib/graphic/shape/Line.js";
import RectShape from"zrender/lib/graphic/shape/Rect.js";
class xhjBox2Chart {
	constructor(dom) {
		this.myChart = echarts.init(dom);
		let dom1 = $(dom).clone(false)[0];
		$(dom1).attr('id','');
		$(dom).before($(dom1));
		this.zr = zrender.init(dom1);

		this.option = {
			color:['#b73a42','#7db2e7','#43cf6e','#04dcfd','#298bee'],
			grid: {
				left: '3%',
				right: '4%',
				bottom: '8%',
				containLabel: true
			},
			legend: {
				top:15,
				data: [],
				itemWidth:15,
				itemHeight:6,
				textStyle:{
					color:'#50a7bd'
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: true,
				axisLine:{
					lineStyle:{
						color:'#00dcff'
					}
				},
				axisLabel:{
					rotate:30,
					interval:0,
					margin:16,
					textStyle:{
						color:'#50a7bd',
						fontSize:14
					}
				},
				axisTick:{
					alignWithLabel:true,
					length:2,
					lineStyle:{
						color:'#fff'
					}
				},
				data: []
			},
			yAxis: {
				type: 'value',
				name:'(%)        ',
				nameGap:8,
				axisLine:{
					lineStyle:{
						color:'#00dcff'
					}
				},
				axisLable:{
					textStyle:{
						color:'#50a7bd',
						fontSize:14,
						fontFamily: "DIN MEDIUM"
					}
				},
				axisTick:{
					length:2,
					lineStyle:{
						color:'#fff'
					}
				},
				splitLine:{
					show:false
				}
			},
			series:[]
		};
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
		let _this = this;
		if (_this._dataProvider == null) return;
		let len = _this._dataProvider.length;

		let xData = {};
		let xArr = [];
		for (let i = 0; i < len; i++) {
			let item = _this._dataProvider[i];
			_this.option.legend.data.push({
				name:item.seriesName,
				icon:'rect'
			});
			let json = {
				name: item.seriesName,
				type:'line',
				data:[],
				symbol:'image://imgs/p3/box4_icon'+(i+1)+'.png',
				symbolSize:10,
				hoverAnimation:false,
				markLine:{
					symbolSize:0,
					label:{
						normal:{
							show:false
						}
					},
					lineStyle:{
						normal:{
							color:'#f4404d',
							type:'solid'
						}
					},
					data:[[{
						x:'49%',
						y:'84%',
					},{
						x:'49%',
						y:'14%',
					}]]
				}
			}
			for (let j = 0; j < item.dataList.length; j++) {
				xData[item.dataList[j].time] = 1;
				json.data.push(item.dataList[j].value);
			}
			_this.option.series.push(json);
		}

		for (let key in xData) {
			xArr.push(key);
		}
		_this.createBg(_this._dataProvider[0].dataList.length);
		_this.option.xAxis.data = xArr;

		_this.myChart.setOption(_this.option);
	}

	createBg(n){
		let bgcolor = 'rgba(25,170,231,1)';
		// 原点
		let vec2 = {
			x:41,
			y:320
		};
		// 总宽度
		let W = 568;
		// 单个bg的宽度
		let perW = W/n*2/3;
		let perH = 260+10;
		// 间距
		let disX = perW/2;

		// 单个箭头的高度
		let unitH = 12;
		// 单个箭头的间距
		let unitDisH = 5;

		let perLen = perH/unitDisH;
		for (var j = 0; j < n; j++) {
			for (let i = 0; i < perLen; i++) {
				let group = new GroupShape();
				let rect = new RectShape({
					shape:{
						x:vec2.x+disX/2+j*disX*3,
						y:vec2.y-perH,
						width:perW,
						height:perH
					}
				})
				group.setClipPath(rect);
				this.zr.add(group);
				let line1 = new LineShape({
					shape:{
						x1:vec2.x+disX*1.5+j*disX*3,
						y1:vec2.y-unitDisH*i,
						x2:vec2.x+disX*0.5+j*disX*3,
						y2:vec2.y-unitDisH*i+unitH
					},
					style:{
						stroke:bgcolor.substring(0,bgcolor.lastIndexOf(',')+1)+Math.min((perLen-i)/perLen,0.4)+')'
					}
				})
				let line2 = new LineShape({
					shape:{
						x1:vec2.x+disX*1.5+j*disX*3,
						y1:vec2.y-unitDisH*i,
						x2:vec2.x+disX*2.5+j*disX*3,
						y2:vec2.y-unitDisH*i+unitH
					},
					style:{
						stroke:bgcolor.substring(0,bgcolor.lastIndexOf(',')+1)+Math.min((perLen-i)/perLen,0.4)+')'
					}
				})
				group.add(line1);
				group.add(line2);
				this.zr.add(line1);
				this.zr.add(line2);
			}
			let dashLine = new LineShape({
				shape:{
					x1:vec2.x+disX*1.5+j*disX*3,
					y1:vec2.y-perH+10,
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

module.exports = xhjBox2Chart;