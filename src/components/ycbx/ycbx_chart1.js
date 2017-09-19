
	var _privateClass = function(){
		this.myEcharts = null;
		this.configData = null;
		this.data = null;
		this.option = null;
		this.isStart = false;
		this.loopTween = null;
	};

	//	公共方法
	var Dashboard2 = function(opt){
		if(opt.dom == undefined){
			console.error("需要传入一个dom的容器对象！");
			return false;
		}

		this._privateVars = new _privateClass();
		this._privateVars.myEcharts = echarts.init(opt.dom, "", { width: 270, height: 270 });
	};

	var p = Dashboard2.prototype;

	p.setConfig = function(config){
		this._privateVars.configData = config;

		if(this._privateVars.data)
			this.createContent();
	};

	p.setDataProvider = function(data){
		this._privateVars.data = data;

		if(this._privateVars.configData)
			this.createContent();
	};

	p.createContent = function(){
		var cur = this;

		var option = {
    		series: [{
			    	type: 'pie',
			    	show: false,
			    	hoverAnimation: false,
			    	radius: ["1.5%", '0%'],
			    	labelLine: {
			    		normal: {show: false}
			    	},
			    	zlevel: 10,
			    	itemStyle:{
			    		normal: {color: "rgba(255,255,255,1)"}
			    	},
			    	data: [{ value: 1 }]
			    },{
	            name: '速度',
	            type: 'gauge',
	            z: 3,
	            min: 1,
	            max: 10,
	            splitNumber: 9,
	            radius: '76%',
	            animation: false,
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    width: 11,
	                    color: [[0.33333, 'rgba(62,86,115,0.01)'],
	                    [0.6666, 'rgba(21,96,117,0.01)'], 
	                    [1, 'rgba(34,78,110,0.01)']]
	                }
	            },
	            axisLabel: {
	            	distance: 0,
	            	formatter: 'D{value}',
	            	textStyle:{
	                    fontSize: 13,
	            		color: "rgba(103,192,255,0.01)"
	            	}
	            },
	            axisTick: {            // 坐标轴小标记
	            	show: false,
	                length: 15,        // 属性length控制线长
	                splitNumber: 1,
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: '#2c4856'
	                }
	            },
	            splitLine: {           // 分隔线
	                show: false,
	                length: 20,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            title : {
	            	offsetCenter: [0, "100%"],
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontSize: 16,
	                    fontFamily: "MicrosoftYaHei",
	                    color: "rgba(80,167,189,0.01)"
	                }
	            },
	            detail : {
	                show: false
	            },
	            pointer: {
	                length: '0%',
	                width: 0
	            },
	            itemStyle:{
	            	normal:{
	            		color: "#05a9df"
	            	}
	            },
	            data:[{value: 0}]
	        }]
    	};

    	if(!this._privateVars.isStart)
    		this.startAnimate(option);
    	else{
    		if (!cur._privateVars.option) {return;}
    		TweenMax.to(cur._privateVars.option.series[1].data[0],1,{ease: Power2.easeInOut, value: this._privateVars.data[this._privateVars.configData["value"]], onUpdate: function(){
    			cur._privateVars.myEcharts.setOption(cur._privateVars.option, true);
    		} });
    	}
    	// else
    	// 	loopAnimation(option);

    	this._privateVars.isStart = true;
	};

	p.startAnimate = function(option){
		var cur = this;

		var $dom = $(cur._privateVars.myEcharts.getDom());
		var $div = $dom.siblings(".textBox");
		var $img = $dom.siblings("img");

		var shineTween = { per: 1 };
		var shineTween1 = { per: 1 };
		var shineTween2 = { per: 1 };

		var t1 = new TimelineMax({ onComplete: function(){ cur._privateVars.option = option; } });

		t1.addLabel("shining", 0);
		t1.addLabel("begining", .9);
		t1.addLabel("numShow", 1.3);

		t1.to(shineTween, 1.5, { per: 3, ease: CustomEase.create("custom", "M0,0 C0,0 0.04,0.028 0.045,0.034 0.046,0.021 0.058,-0.036 0.06,-0.05 0.06,-0.05 0.132,-0.022 0.132,-0.022 0.132,-0.022 0.198,0.052 0.198,0.052 0.198,0.052 0.235,-0.06 0.235,-0.082 0.235,-0.054 0.312,0.074 0.312,0.074 0.312,0.074 0.376,-0.054 0.376,-0.054 0.376,-0.054 0.434,-0.102 0.434,-0.102 0.434,-0.102 0.472,0.04 0.472,0.04 0.472,0.04 0.51,0.172 0.51,0.172 0.51,0.172 0.554,-0.133 0.558,-0.14 0.558,-0.14 0.581,0.154 0.584,0.19 0.584,0.19 0.626,-0.041 0.638,-0.044 0.638,-0.054 0.663,0.099 0.668,0.112 0.668,0.112 0.731,-0.07 0.74,-0.082 0.742,-0.064 0.786,-0.01 0.786,-0.01 0.793,-0.018 0.825,-0.062 0.825,-0.062 0.825,-0.061 0.86,0.046 0.862,0.048 0.862,0.038 0.906,-0.02 0.906,-0.02 0.906,-0.02 0.923,0.026 0.926,0.04 0.926,0.04 0.956,0.012 0.964,0 0.964,0 1,0 1,0"), onUpdate: function(){
			option.series[1].axisLine.lineStyle.color[0] = [0.33333, 'rgba(62,86,115,'+shineTween.per+')'];

			cur._privateVars.myEcharts.setOption(option, true);
		} ,onComplete: function(){
			option.series[1].axisLine.lineStyle.color = [[0.33333, 'rgba(62,86,115,0)'],
	                    [0.6666, 'rgba(21,96,117,0)'], 
	                    [1, 'rgba(34,78,110,0)']];

	        $img.css("opacity", 1);
		}}, "shining")
		.to(shineTween1, 1, { per: 3, ease: CustomEase.create("custom", "M0,0 C0,0 0.04,0.028 0.045,0.034 0.046,0.021 0.058,-0.036 0.06,-0.05 0.06,-0.05 0.132,-0.022 0.132,-0.022 0.132,-0.022 0.198,0.052 0.198,0.052 0.198,0.052 0.235,-0.06 0.235,-0.082 0.235,-0.054 0.312,0.074 0.312,0.074 0.312,0.074 0.376,-0.054 0.376,-0.054 0.376,-0.054 0.434,-0.102 0.434,-0.102 0.434,-0.102 0.472,0.04 0.472,0.04 0.472,0.04 0.51,0.172 0.51,0.172 0.51,0.172 0.554,-0.133 0.558,-0.14 0.558,-0.14 0.581,0.154 0.584,0.19 0.584,0.19 0.626,-0.041 0.638,-0.044 0.638,-0.054 0.663,0.099 0.668,0.112 0.668,0.112 0.731,-0.07 0.74,-0.082 0.742,-0.064 0.786,-0.01 0.786,-0.01 0.793,-0.018 0.825,-0.062 0.825,-0.062 0.825,-0.061 0.86,0.046 0.862,0.048 0.862,0.038 0.906,-0.02 0.906,-0.02 0.906,-0.02 0.923,0.026 0.926,0.04 0.926,0.04 0.956,0.012 0.964,0 0.964,0 1,0 1,0"), onUpdate: function(){
			option.series[1].axisLine.lineStyle.color[1] = [0.6666, 'rgba(21,96,117,'+(shineTween.per)+')'];

		} }, "shining+=.3")
		.to(shineTween2, 0.8, { per: 3, ease: CustomEase.create("custom", "M0,0 C0,0 0.04,0.028 0.045,0.034 0.046,0.021 0.058,-0.036 0.06,-0.05 0.06,-0.05 0.132,-0.022 0.132,-0.022 0.132,-0.022 0.198,0.052 0.198,0.052 0.198,0.052 0.235,-0.06 0.235,-0.082 0.235,-0.054 0.312,0.074 0.312,0.074 0.312,0.074 0.376,-0.054 0.376,-0.054 0.376,-0.054 0.434,-0.102 0.434,-0.102 0.434,-0.102 0.472,0.04 0.472,0.04 0.472,0.04 0.51,0.172 0.51,0.172 0.51,0.172 0.554,-0.133 0.558,-0.14 0.558,-0.14 0.581,0.154 0.584,0.19 0.584,0.19 0.626,-0.041 0.638,-0.044 0.638,-0.054 0.663,0.099 0.668,0.112 0.668,0.112 0.731,-0.07 0.74,-0.082 0.742,-0.064 0.786,-0.01 0.786,-0.01 0.793,-0.018 0.825,-0.062 0.825,-0.062 0.825,-0.061 0.86,0.046 0.862,0.048 0.862,0.038 0.906,-0.02 0.906,-0.02 0.906,-0.02 0.923,0.026 0.926,0.04 0.926,0.04 0.956,0.012 0.964,0 0.964,0 1,0 1,0"), onUpdate: function(){
			option.series[1].axisLine.lineStyle.color[2] = [1, 'rgba(34,78,110,'+(shineTween.per)+')'];
			cur._privateVars.myEcharts.setOption(option, true);
		}}, "shining+=0.5")
		.to(option.series[1].axisLabel.textStyle,.6,{ color: "rgba(103,192,255,1)", 
			onStart: function(){

				option.series[0].show = true;

				option.series.push({
			    	type: 'pie',
			    	animationDuration: 400,
			    	hoverAnimation: false,
			    	radius: ["40%", '0%'],
			    	labelLine: {
			    		normal: {show: false}
			    	},
			    	itemStyle:{
			    		normal: {color: "rgba(126,178,230,0.1)"}
			    	},
			    	data: [{ value: 1 }]
			    },{
			    	type: 'pie',
			    	animationDuration: 400,
			    	hoverAnimation: false,
			    	radius: ["30%", '0%'],
			    	labelLine: {
			    		normal: {show: false}
			    	},
			    	itemStyle:{
			    		normal: {color: "rgba(126,178,230,0.2)"}
			    	},
			    	data: [{ value: 1 }]
			    });

			},
			onUpdate: function(){
				cur._privateVars.myEcharts.setOption(option, true);
			}},"begining")
		.to(option.series[1].title.textStyle, .6, {color: "rgba(80,167,189,1)"},"begining")
		.to($div, .4, {opacity: 1},"begining")
		.to(option.series[1].data[0],1,{ ease: Power2.easeInOut, value: this._privateVars.data[this._privateVars.configData["value"]],onStart: function(){
				option.series[1].pointer.length = "60%";
				option.series[1].pointer.width = 6;
			},onUpdate: function(){

				cur._privateVars.myEcharts.setOption(option, true);
			}}, "numShow");

	};

	p.loopAnimation = function(option){
		var cur = this;
		var $dom = $(cur._privateVars.myEcharts.getDom());
		cur._privateVars.myEcharts.setOption(option, true);

		if(this._privateVars.loopTween instanceof TweenMax)
			this._privateVars.loopTween.kill();

		var t = { per: 0 };
		var angle = 0;
		this._privateVars.loopTween = TweenMax.to(t, 1.6, { per: 1, onRepeat: function(){
			if(Math.random()>.7){
				option.series[1].axisLine.lineStyle.color[0] = [0.33333, 'rgba(62,86,115,'+(0.3+Math.random()*.5)+')'];
			}
			else
				option.series[1].axisLine.lineStyle.color[0] = [0.33333, 'rgba(62,86,115,'+0.3+')'];

			if(Math.random()>.8){
				option.series[1].axisLine.lineStyle.color[1] = [0.6666, 'rgba(21,96,117,'+(0.3+Math.random()*.5)+')'];
			}
			else
				option.series[1].axisLine.lineStyle.color[1] = [0.6666, 'rgba(21,96,117,'+0.3+')'];

			if(Math.random()>.6){
				option.series[1].axisLine.lineStyle.color[2] = [1, 'rgba(34,78,110,'+(0.3+Math.random()*.5)+')'];
			}
			else
				option.series[1].axisLine.lineStyle.color[2] = [1, 'rgba(34,78,110,'+0.3+')'];

			cur._privateVars.myEcharts.setOption(option, true);

		}, repeat: -1 });
	};

module.exports = Dashboard2;