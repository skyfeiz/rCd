const zrender = require('zrender');
const ImageShape = require("zrender/lib/graphic/Image.js");
function ZnfwGzlAct(dom,dombg) {
	this.zr = zrender.init(dombg);

	this._dom = dom;
	this._domW = this._dom.offsetWidth;
	this._domH = this._dom.offsetHeight;
	this._centerX = this._domW / 2;
	this._centerY = this._domH * 0.6;
	this._outR = this._domW > this._domH ? this._domH * 0.46 : this._domW * 0.46;
	this._outR = this._outR / 2 + 50;

	this.oldOption = null;

	var current = this;
	current._pieChart = echarts.init(current._dom);

	current._pieChart.on('mouseover',function(param){
		current._option.graphic[param.dataIndex+1].children.map(function(obj,idx){
			if (idx == 1) {
				obj.style.font = '35px DIN MEDIUM';
			}else if (idx == 2) {
				obj.style.font = '20px Microsoft Yahei';
			}
		});
		current._pieChart.setOption(current._option);
		current.setHeightLight(param.dataIndex);
	})

	current._pieChart.on('mouseout',function(param){
		current._pieChart.setOption(current.oldOption);
		current._option = $.extend(true,{},current.oldOption);
	})
	// 颜色序列
	current._colorArray = ['#00dcff', '#7eb2e6', '#ffffff'];

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
            	r: current._outR - 32,
            	r0: current._outR - 60
            },
            style: {
            	fill: 'rgba(73, 112, 164, 0.2)'
            }
	    }],
	    legend: {
	        x: 'center',
	        data:[],
	        top:60,
	        textStyle: {
	        	color: '#50a7bd',
            	fontSize: 13,
            	fontFamily: 'Microsoft Yahei'
	        },
	        itemGap: 50,
	        itemWidth:15,
            itemHeight:6,
	        selectedMode: false
	    },
	    series: [
	        {
	            name:'访问来源',
	            type:'pie',
	            radius: ['34%', '46%'],
            	center:['50%','60%'],
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
	                    length: 50,
	                    length2: 50,
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
}

ZnfwGzlAct.prototype = {
	constructor: ZnfwGzlAct,

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
				x += 50;
			} else {
				textX = -80;
				x -= 50;
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
	                    top: -20,
	                    z: 100,
	                    style: {
	                        fill: '#66ffff',
	                        text: num + '%',
	                        font: '25px DIN MEDIUM'
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
	                        font: '15px Microsoft Yahei'
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

		current.oldOption = $.extend(true,{},current._option);
		// 如需选中交互，可以通过以下代码实现
		// current._pieChart.on('pieselectchanged', function(params) {
		// 	console.log(params);
		// });

		// current._pieChart.dispatchAction({
	 //        type: 'highlight',
	 //        seriesIndex: 0,
	 //        dataIndex: 1
	 //    });
	 	let imgSrc = require("../../imgs/p1/gzlgear1.png");
        let img = new ImageShape({
            style: {
                x: current._centerX-60,
                y: current._centerY-60,
                image: imgSrc,
                width: 120,
                height: 120
            }
        });
        current.zr.add(img);

        let imgSrc1 = require("../../imgs/p1/gzlactbg01.png");
        let img1 = new ImageShape({
            style: {
                x: current._centerX-152,
                y: current._centerY-152,
                image: imgSrc1,
                width: 304,
                height: 305
            }
        });
        current.zr.add(img1);
        current.animation(img1,1,current._centerX,current._centerY);

        let imgSrc2 = require("../../imgs/p1/gzlactbg02.png");
        let img2 = new ImageShape({
            style: {
                x: current._centerX-161,
                y: current._centerY-150,
                image: imgSrc2,
                width: 322,
                height: 322
            }
        });
        current.zr.add(img2);
        current.animation(img2,-1,current._centerX,current._centerY);
	},

	animation(obj,dir,x,y){
		let current = this;
		obj.origin = [x,y];
		obj.ratation = 0;
		obj.animate('',true).when(10000,{rotation:dir*Math.PI*2}).start()
	},
	resize: function() {

	},

	dispose: function() {

	},
	setHeightLight:function(b){
		// 取消之前高亮的图形
	    this._pieChart.dispatchAction({
	        type: 'downplay',
	        seriesIndex: 0,
	        dataIndex: 0
	    });
	    this._pieChart.dispatchAction({
	        type: 'downplay',
	        seriesIndex: 0,
	        dataIndex: 1
	    });
	    this._pieChart.dispatchAction({
	        type: 'downplay',
	        seriesIndex: 0,
	        dataIndex: 2
	    });
	    // 高亮当前图形
		this._pieChart.dispatchAction({
	        type: 'highlight',
	        seriesIndex: 0,
	        dataIndex: b
	    });
	}
}

module.exports = ZnfwGzlAct;