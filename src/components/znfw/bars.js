import zrender from "zrender";
import Rect from "zrender/lib/graphic/shape/Rect";
import LinearGradient from "zrender/lib/graphic/LinearGradient.js";
import GroupShape from "zrender/lib/container/Group";
var bars = function(dom, opt) {
	if (dom == undefined) {
		console.error("Need a Container!");
		return false;
	}

	var dom1 = $(dom).clone()[0];
	$(dom).before($(dom1));
	$(dom1).css({
		width:442,
		height:322
	});
	this.zr = zrender.init(dom1);

	this._privateVars = {
		myEcharts: echarts.init(dom, "", opt ? {
			width: opt.width || 442,
			height: opt.height || 322
		} : {}),
		/*myEcharts2: echarts.init(dom1, "", opt ? {
			width: opt.width || 442,
			height: opt.height || 322
		} : {}),*/
		type: opt.type || 1
	};
	let lineGradient = [{
		offset: 0,
		color: 'rgba(43,73,108,0.2)'
	}, {
		offset: 0.5,
		color: 'rgba(43,73,108,0.1)'
	}, {
		offset: 1,
		color: 'rgba(43,73,108,0)'
	}];
	this.fillcolor = new LinearGradient(0, 0, 0, 1, lineGradient, false);
};

var p = bars.prototype;

p.setConfig = function(config) {
	this._privateVars.configData = config;

	if (this._privateVars.data)
		this.createContent();
};

p.setDataProvider = function(data) {
	let newData = {
		category:[],
		data:[],
		name:[]
	};
	for (let i = 0; i < data.length; i++) {
		newData.category.push(data[i].name);
		newData.data.push(data[i].value);
	}
	this._len = data.length;

	if (this._len == 6) {
		newData.name=['增加','汇总'];
	}
	this._privateVars.data = newData;
	if (this._privateVars.configData)
		this.createContent();
};

p.createContent = function() {

	this._privateVars.data1 = [];
	this._privateVars.data2 = [];
	this._privateVars.bottomData = [];
	this._privateVars.bgData = [];
	this._privateVars.textData = [];

	var data = this._privateVars.data[this._privateVars.configData["value"]];

	var sum = 0;
	for (var i = 0; i < data.length - 1; i++) {
		this._privateVars.data1.push(data[i]);
		this._privateVars.data2.push(0);
		this._privateVars.bottomData.push(sum);
		sum += data[i];
		this._privateVars.bgData[i] = 1;
		this._privateVars.textData.push(sum);
	}

	this._privateVars.bgData.push(1);

	if (this._privateVars.type == 2) {
		this._privateVars.sum = data[data.length - 1];
		this._privateVars.data1.push(0);
		this._privateVars.data2.push(data[data.length - 1]);
		this._privateVars.bottomData.push(0);
		this._privateVars.textData.push(sum);
	} else {
		this._privateVars.data2.push(0);
		this._privateVars.data1.push(data[data.length - 1]);
		this._privateVars.bottomData.push(sum);
		this._privateVars.sum = sum + data[data.length - 1];
		this._privateVars.textData.push(sum + data[data.length - 1]);
	}

	this.createContent1();
	// this.createContent2();
};

p.createContent1 = function() {
	var cur = this;

	var option = {
		// animation: false,
		grid: {
			top: "15%",
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		legend: {
			show: !!(this._privateVars.type == 2),
			top:'3%',
			itemWidth: 20,
			itemHeight: 8,
			selectedMode: false,
			textStyle: {
				color: "#50a7bd"
			},
			data: this._privateVars.type == 2 ? [{
				icon: "rect",
				name: this._privateVars.data[this._privateVars.configData["legend"]][0]
			}, {
				icon: "rect",
				name: this._privateVars.data[this._privateVars.configData["legend"]][1]
			}] : [{
				icon: "rect",
				name: this._privateVars.data[this._privateVars.configData["legend"]][0]
			}]
		},
		xAxis: {
			type: 'category',
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#00dcff"
				}
			},
			axisLabel: {
				textStyle: {
					color: "#50a7bd",
					fontFamily: 'DIN MEDIUM'
				},
				interval: 0,
				formatter:function(param,b){
					if ((b+1)%2) {
						param = '\n'+param;
					}
					return param;
				}
			},
			axisTick: {
				length: 2,
				lineStyle: {
					color: "#c7daf7",
					width: 2
				}
			},
			data: this._privateVars.data[this._privateVars.configData["label"]]
		},
		yAxis: {
			type: 'value',
			name: "(%)        ",
			nameTextStyle: {
				color: "#50a7bd"
			},
			nameGap: 12,
			splitNumber: 3,
			max: Math.round(this._privateVars.sum * 1.1),
			axisLine: {
				lineStyle: {
					color: "#00dcff"
				}
			},
			axisLabel: {
				textStyle: {
					color: "#50a7bd"
				}
			},
			axisTick: {
				length: 2,
				lineStyle: {
					color: "#c7daf7",
					width: 2
				}
			},
			splitLine: {
				lineStyle: {
					color: "rgba(0,220,255,0.2)"
				}
			}
		},
		series: [{
			type: 'bar',
			stack: '总量',
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(0,0,0,0)',
					color: 'rgba(0,0,0,0)'
				},
				emphasis: {
					barBorderColor: 'rgba(0,0,0,0)',
					color: 'rgba(0,0,0,0)'
				}
			},
			data: this._privateVars.bottomData
		}, {
			name: this._privateVars.data[this._privateVars.configData["legend"]][0],
			type: 'bar',
			stack: '总量',
			barWidth: 46,
			label: {
				normal: {
					show: false,
					position: 'inside'
				}
			},
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(4,111,132,0.6)',
					color: '#00dcff'
				}
			},
			data: this._privateVars.data1
				// {value: 2900, itemStyle: { normal: {color: "#7eb2e6"} }}
		}, {
			name: this._privateVars.data[this._privateVars.configData["legend"]][1],
			type: 'bar',
			stack: '总量',
			barWidth: 46,
			label: {
				normal: {
					show: false,
					position: 'inside'
				}
			},
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(4,111,132,0.6)',
					color: '#7eb2e6'
				}
			},
			data: this._privateVars.data2
		}, {
			data: this._privateVars.textData,
			type: 'scatter',
			symbol: 'image://imgs/p1/barLabelBG.png',
			symbolSize: [34, 19],
			label: {
				normal: {
					show: true,
					fontSize: 14,
					offset: [0, -5],
					textStyle: {
						color: "#0f1535",
						fontFamily: 'DIN MEDIUM',
						fontSize:14
					},
					formatter: function(p) {
						return (p.value - cur._privateVars.bottomData[p.dataIndex]) + "%";
					}
				}
			},
			symbolOffset: [0, -12]
		}]
	};

	this._privateVars.myEcharts.setOption(option, true);
	this.createbg();

};

p.createbg = function(){
	let baseGroup = new GroupShape();
	let rectArea = new Rect({
		shape:{
			x:47,
			y:48,
			width:380,
			height:232
		}
	})
	baseGroup.setClipPath(rectArea);

	this.zr.add(baseGroup);
	let len = this._len;
	let disX = 76.5;
	let sX = 52;
	let w = 57;
	let h = 232;
	if (len == 6) {
		sX = 45;
		w = 58;
		disX = 64;
	}
	for (let i = 0; i < 6; i++) {
		let rect1 = new Rect({
			shape:{
				x:sX+disX*i,
				y:48+h,
				width:w,
				height:h
			},
			style:{
				fill:this.fillcolor
			}
		})

		let rect2 = new Rect({
			shape:{
				x:sX+disX*i,
				y:48,
				width:w,
				height:h
			},
			style:{
				fill:'rgba(43,73,108,0.1)'
			}
		})

		callBackSelf(rect1,h);

		baseGroup.add(rect1);
		this.zr.add(rect1);
		this.zr.add(rect2);
	}

	function callBackSelf(curObj,h){
		let delay = Math.random() * 2000 + 1000;
		let during = Math.random() * 6000 + 4000;
		curObj.animateShape().when(during,{y:48-h*2}).start().delay(delay).done(function(){
			curObj.shape.y = 48+h;
			callBackSelf(curObj,h);
		});
	}

};

/*p.createContent2 = function() {
	var option = {
		grid: {
			top: "15%",
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			show: false,
			data: this._privateVars.data[this._privateVars.configData["label"]]
		},
		yAxis: {
			type: 'value',
			// max: Math.round(this._privateVars.sum*1.2),
			show: false
		},
		series: [{
			name: '背景',
			type: 'bar',
			barWidth: 57,
			itemStyle: {
				normal: {
					barBorderColor: 'rgba(90,142,207,0.15)',
					color: 'rgba(90,142,207,0.15)'
				},
				emphasis: {
					barBorderColor: 'rgba(90,142,207,0.15)',
					color: 'rgba(90,142,207,0.15)'
				}
			},
			data: this._privateVars.bgData
		}]
	};

	this._privateVars.myEcharts2.setOption(option, true);
};*/

module.exports = bars;