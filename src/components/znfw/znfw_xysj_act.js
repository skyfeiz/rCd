const zrender = require('zrender');
const ImageShape = require("zrender/lib/graphic/Image.js");
const CircleShape = require("zrender/lib/graphic/shape/Circle.js");
const groupShape = require("zrender/lib/container/Group");
function ZnfwXysjAct(dom,dombg) {
	this.zr = zrender.init(dombg);

	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;
	this._centerX = this._domW / 2;
	this._centerY = this._domH * 0.58;
	this._outR = this._domW > this._domH ? this._domH * 0.46 : this._domW * 0.46;
	this._outR = this._outR / 2 + 30;


	var current = this;
	current._pieChart = echarts.init(current._dom);
	// 颜色序列
	current._colorArray = ['#00dcff', '#7eb2e6','#2061a2','#b73941','#ffffff'];

	current._option = {
	    // tooltip: {
	    //     trigger: 'item',
	    //     formatter: "{a} <br/>{b}: {c} ({d}%)"
	    // },
	    graphic: [{
	    	type: 'ring',
            bounding: 'raw',
            shape: {
            	cx: current._centerX,
            	cy: current._centerY,
            	r: current._outR - 22,
            	r0: current._outR - 40
            },
            style: {
            	fill: 'rgba(73, 112, 164, 0.2)'
            }
	    }],
	    legend: {
	        x: 'center',
	        data:[],
	        top:40,
	        width:300,
	        textStyle: {
	        	color: '#50a7bd',
            	fontSize: 13,
            	fontFamily: 'Microsoft Yahei'
	        },
	        itemGap: 10,
	        itemWidth:15,
            itemHeight:6,
	        selectedMode: false
	    },
	    series: [
	        {
	            name:'访问来源',
	            type:'pie',
	            radius: ['35%', '46%'],
				center: ['50%', '58%'],
	            selectedMode: 'single',
	            selectedOffset: 0,
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    textStyle: {
	                    	color: 'rgba(0,0,0,0)'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    length: 30,
	                    length2: 30,
	                    lineStyle: {
	                    	type: 'dotted'
	                    }
	                }
	            },
	            itemStyle: {
	            	normal: {
	            		color: function(params) {
	            			return current._colorArray[params.dataIndex % current._colorArray.length];
	            		}
	            	}
	            },
	            data:[]
	        }
	    ]
	};

	this.init();
}

ZnfwXysjAct.prototype = {
	constructor: ZnfwXysjAct,

	init: function() {
		this.initBg();
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

	creationContent() {
		var current = this;
		if (current._config == null || current._dataProvider == null) return;

		var sum = 0;
		current._dataProvider.map(function(item) {
			sum += Number(item[current._config.valueField]);
		});

		var legendArr = [];

		var startAngle = -90;
		current._dataProvider.map(function(item, index) {
			var num = Number(item[current._config.valueField]);
			var angle = 360 * num / sum;
			var middleAngle = startAngle + angle / 2;

			var x = current._centerX + current._outR * Math.cos(middleAngle * Math.PI / 180);
			var y = current._centerY + current._outR * Math.sin(middleAngle * Math.PI / 180);

			var text = item[current._config.nameField];
			num = num.toFixed(1);
			if (middleAngle < 90 || middleAngle > 270) {
				var textX = 10;
				x += 30;
			} else {
				textX = -60;
				x -= 30;
			}

			startAngle += angle;

			var color = current._colorArray[index % current._colorArray.length];

			// 生成labelLine末端的发光点和显示文本
			var element = {
	            type: 'group',
	            bounding: 'raw',
	            left: x,
                top: y,
	            children: [
	                {
	                    type: 'rect',
	                    left: 'center',
	                    top: 'center',
	                    shape: {
	                        width: 3,
	                        height: 3
	                    },
	                    style: {
	                        fill: color
	                    }
	                },
	                {
	                    type: 'text',
	                    left: textX,	
	                    top: 'center',
	                    z: 100,
	                    style: {
	                        fill: '#66ffff',
	                        text: num + '%',
	                        font: '18px DIN MEDIUM'
	                    }
	                },
	                {
	                    type: 'text',
	                    left: textX,
	                    top: 12,
	                    z: 100,
	                    style: {
	                        fill: '#50a7bd',
	                        text: text,
	                        font: '13px DIN MEDIUM'
	                    }
	                }
	            ]
	        };
	        current._option.graphic.push(element);

	        // 生成图例
	        var legendItem = {name: item[current._config.nameField], icon: 'rect'};
	        legendArr.push(legendItem);
		});

		current._option.legend.data = legendArr;

		var seriesItem = current._option.series[0];
		seriesItem.data = current._dataProvider;
		current._pieChart.setOption(current._option);

		// 如需选中交互，可以通过以下代码实现
		// current._pieChart.on('pieselectchanged', function(params) {
		// 	console.log(params);
		// });

		// current._pieChart.dispatchAction({
	 //        type: 'highlight',
	 //        seriesIndex: 0,
	 //        dataIndex: 1
	 //    });
	 	
	},

	initBg:function(){

		let c1 = new CircleShape({
	 		shape:{
	 			cx:this._centerX,
	 			cy:this._centerY,
	 			r:105
	 		},
	 		style:{
	 			fill:'none',
	 			stroke:'rgba(0,183,255,0.2)'
	 		}
	 	})
	 	this.zr.add(c1);

	 	let c2 = new CircleShape({
	 		shape:{
	 			cx:this._centerX,
	 			cy:this._centerY,
	 			r:61
	 		},
	 		style:{
	 			fill:'none',
	 			stroke:'rgba(0,183,255,0.15)'
	 		}
	 	})
	 	this.zr.add(c2);

	 	let imgSrc = require("../../imgs/p1/xysjactbg1.png");
	 	let img = new ImageShape({
	 		style: {
                x: this._centerX - 62,
                y: this._centerY - 62,
                image: imgSrc,
                width: 124,
                height: 124
            }
	 	})
	 	this.zr.add(img);
	 	img.origin=[this._centerX,this._centerY];
	 	img.animate('',true).when(8000,{rotation:Math.PI*2}).start();
	 	let imgSrc2 = require("../../imgs/p1/xysjactbg2.png");
	 	let img2 = new ImageShape({
	 		style: {
                x: this._centerX - 32,
                y: this._centerY - 32,
                image: imgSrc2,
                width: 64,
                height: 64
            }
	 	})
	 	this.zr.add(img2);
	 	img2.origin=[this._centerX,this._centerY];
	 	img2.animate('',true).when(8000,{rotation:-Math.PI*2}).start();
	},

	resize: function() {

	},

	dispose: function() {

	}
}

module.exports = ZnfwXysjAct;