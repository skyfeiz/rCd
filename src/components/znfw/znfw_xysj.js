class _privateClass {
	constructor() {
		this.myEcharts = null;
		this.configData = null;
		this.data = null;
		this.option = null;
		this.isStart = false;
		this.loopTween = null;
		this.startN = 0;
	}
}

class ZnfwXysj {
	constructor(dom,startNum) {
		if (dom == undefined) {
			console.error("need a dom");
			return false;
		}
		this.EventDispatcher = $({});
		this._privateVars = new _privateClass();
		this._privateVars.startN = startNum || 0;
		this._privateVars.myEcharts = echarts.init(dom, "", {
			width: 216,
			height: 216
		});
		let _this = this;
		this._privateVars.myEcharts.on('click',function(param){
			if (param.dataIndex == 1) {return}
			param.event.event.cancelBubble = true;
			if (_this._privateVars.isStart) {return}
			_this._privateVars.option.series[0].data[0].value = _this._privateVars.startN;
			_this.startAnimate(_this._privateVars.option);
			_this._privateVars.isStart = true;
			return false;
		});
	}

	setConfig(value) {
		this._privateVars.configData = value;

		if (this._privateVars.data)
			this.createContent();
	}

	setDataProvider(value) {
		this._privateVars.data = value;

		if (this._privateVars.configData)
			this.createContent();
	}

	createContent() {

		var option = {
			series: [{
				type: 'gauge',
				z: 3,
				min: 0,
				max: 500,
				splitNumber: 10,
				radius: '76%',
				animation: false,
				axisLine: { // ×ø±êÖáÏß
					lineStyle: { // ÊôÐÔlineStyle¿ØÖÆÏßÌõÑùÊ½
						width: 20,
						color: [
							[0.52, 'rgba(50,181,158,0.01)'],
							[0.77, 'rgba(253,186,80,0.01)'],
							[1, 'rgba(135,38,41,0.01)']
						]
					}
				},
				axisLabel: {
					distance: -38,
					textStyle: {
						fontSize: 9,
						color: "rgba(188,226,255,0.01)",
						fontFamily: 'DIN MEDIUM'
					}
				},
				axisTick: { // ×ø±êÖáÐ¡±ê¼Ç
					show: false,
					length: 5, // ÊôÐÔlength¿ØÖÆÏß³¤
					splitNumber: 1,
					lineStyle: { // ÊôÐÔlineStyle¿ØÖÆÏßÌõÑùÊ½
						color: '#7eb2e6'
					}
				},
				splitLine: { // ·Ö¸ôÏß
					show: false,
					length: 20, // ÊôÐÔlength¿ØÖÆÏß³¤
					lineStyle: { // ÊôÐÔlineStyle£¨Ïê¼ûlineStyle£©¿ØÖÆÏßÌõÑùÊ½
						color: 'auto'
					}
				},
				title: {
					offsetCenter: [0, "100%"],
					textStyle: { // ÆäÓàÊôÐÔÄ¬ÈÏÊ¹ÓÃÈ«¾ÖÎÄ±¾ÑùÊ½£¬Ïê¼ûTEXTSTYLE
						fontSize: 16,
						fontFamily: "MicrosoftYaHei",
						color: "rgba(80,167,189,0.01)"
					}
				},
				detail: {
					show: false
				},
				pointer: {
					length: '0%',
					width: 0
				},
				itemStyle: {
					normal: {
						color: "#ffbb51"
					}
				},
				data: [{
					value: this._privateVars.startN,
					name: this._privateVars.data[this._privateVars.configData["label"]]
				}]
			}]
		};

		if (!this._privateVars.isStart)
			this.startAnimate(option);
		else
			loopAnimation(option);

		this._privateVars.isStart = true;
		this._privateVars.option = option;
	}

	startAnimate(option) {
		var cur = this;

		var $dom = $(cur._privateVars.myEcharts.getDom());
		var $img = $dom.siblings("img");
		var $div = $dom.siblings(".textBox");

		var shineTween = {
			per: 0.3
		};
		var shineTween1 = {
			per: 0.3
		};
		var shineTween2 = {
			per: 0.3
		};

		var t1 = new TimelineMax({
			onComplete: function() {
				cur.loopAnimation(option);
			}
		});
		this.t1 = t1;
		t1.addLabel("shining", 0);
		t1.addLabel("begining", .9);
		t1.addLabel("numShow", 1.3);

		t1.to(shineTween, 1.5, {
				per: 3,
				ease: CustomEase.create("custom", "M0,0 C0,0 0.04,0.028 0.045,0.034 0.046,0.021 0.058,-0.036 0.06,-0.05 0.06,-0.05 0.132,-0.022 0.132,-0.022 0.132,-0.022 0.198,0.052 0.198,0.052 0.198,0.052 0.235,-0.06 0.235,-0.082 0.235,-0.054 0.312,0.074 0.312,0.074 0.312,0.074 0.376,-0.054 0.376,-0.054 0.376,-0.054 0.434,-0.102 0.434,-0.102 0.434,-0.102 0.472,0.04 0.472,0.04 0.472,0.04 0.51,0.172 0.51,0.172 0.51,0.172 0.554,-0.133 0.558,-0.14 0.558,-0.14 0.581,0.154 0.584,0.19 0.584,0.19 0.626,-0.041 0.638,-0.044 0.638,-0.054 0.663,0.099 0.668,0.112 0.668,0.112 0.731,-0.07 0.74,-0.082 0.742,-0.064 0.786,-0.01 0.786,-0.01 0.793,-0.018 0.825,-0.062 0.825,-0.062 0.825,-0.061 0.86,0.046 0.862,0.048 0.862,0.038 0.906,-0.02 0.906,-0.02 0.906,-0.02 0.923,0.026 0.926,0.04 0.926,0.04 0.956,0.012 0.964,0 0.964,0 1,0 1,0"),
				onUpdate: function() {
					option.series[0].axisLine.lineStyle.color[0] = [0.52, 'rgba(50,181,158,' + shineTween.per + ')'];

					cur._privateVars.myEcharts.setOption(option, true);
				}
			}, "shining")
			.to(shineTween1, 1, {
				per: 3,
				ease: CustomEase.create("custom", "M0,0 C0,0 0.04,0.028 0.045,0.034 0.046,0.021 0.058,-0.036 0.06,-0.05 0.06,-0.05 0.132,-0.022 0.132,-0.022 0.132,-0.022 0.198,0.052 0.198,0.052 0.198,0.052 0.235,-0.06 0.235,-0.082 0.235,-0.054 0.312,0.074 0.312,0.074 0.312,0.074 0.376,-0.054 0.376,-0.054 0.376,-0.054 0.434,-0.102 0.434,-0.102 0.434,-0.102 0.472,0.04 0.472,0.04 0.472,0.04 0.51,0.172 0.51,0.172 0.51,0.172 0.554,-0.133 0.558,-0.14 0.558,-0.14 0.581,0.154 0.584,0.19 0.584,0.19 0.626,-0.041 0.638,-0.044 0.638,-0.054 0.663,0.099 0.668,0.112 0.668,0.112 0.731,-0.07 0.74,-0.082 0.742,-0.064 0.786,-0.01 0.786,-0.01 0.793,-0.018 0.825,-0.062 0.825,-0.062 0.825,-0.061 0.86,0.046 0.862,0.048 0.862,0.038 0.906,-0.02 0.906,-0.02 0.906,-0.02 0.923,0.026 0.926,0.04 0.926,0.04 0.956,0.012 0.964,0 0.964,0 1,0 1,0"),
				onUpdate: function() {
					option.series[0].axisLine.lineStyle.color[1] = [0.77, 'rgba(253,186,80,' + (shineTween.per) + ')'];

					// cur._privateVars.myEcharts.setOption(option, true);
				}
			}, "shining+=.3")
			.to(shineTween2, 0.8, {
				per: 3,
				ease: CustomEase.create("custom", "M0,0 C0,0 0.04,0.028 0.045,0.034 0.046,0.021 0.058,-0.036 0.06,-0.05 0.06,-0.05 0.132,-0.022 0.132,-0.022 0.132,-0.022 0.198,0.052 0.198,0.052 0.198,0.052 0.235,-0.06 0.235,-0.082 0.235,-0.054 0.312,0.074 0.312,0.074 0.312,0.074 0.376,-0.054 0.376,-0.054 0.376,-0.054 0.434,-0.102 0.434,-0.102 0.434,-0.102 0.472,0.04 0.472,0.04 0.472,0.04 0.51,0.172 0.51,0.172 0.51,0.172 0.554,-0.133 0.558,-0.14 0.558,-0.14 0.581,0.154 0.584,0.19 0.584,0.19 0.626,-0.041 0.638,-0.044 0.638,-0.054 0.663,0.099 0.668,0.112 0.668,0.112 0.731,-0.07 0.74,-0.082 0.742,-0.064 0.786,-0.01 0.786,-0.01 0.793,-0.018 0.825,-0.062 0.825,-0.062 0.825,-0.061 0.86,0.046 0.862,0.048 0.862,0.038 0.906,-0.02 0.906,-0.02 0.906,-0.02 0.923,0.026 0.926,0.04 0.926,0.04 0.956,0.012 0.964,0 0.964,0 1,0 1,0"),
				onUpdate: function() {
					option.series[0].axisLine.lineStyle.color[2] = [1, 'rgba(135,38,41,' + (shineTween.per) + ')'];
					cur._privateVars.myEcharts.setOption(option, true);
				}
			}, "shining+=0.5")
			.to(option.series[0].axisLabel.textStyle, .6, {
				color: "rgba(188,226,255,1)",
				onStart: function() {
					option.series[0].axisTick.show = true;

					option.series.push({
						type: 'pie',
						animationDuration: 400,
						radius: ["55.5%", '55%'],
						labelLine: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								color: "rgba(129,196,247,0.4)"
							}
						},
						silent:true,
						data: [{
							value: 1
						}]
					}, {
						type: 'pie',
						animationDuration: 400,
						radius: ["48.5%", '48%'],
						silent:true,
						labelLine: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								color: "rgba(129,196,247,0.4)"
							}
						},
						data: [{
							value: 1
						}]
					},{
						type: 'pie',
						animationDuration: 400,
						radius: ["57%", '76%'],
						silent:false,
						labelLine: {
							normal: {
								show: false
							}
						},
						itemStyle: {
							normal: {
								color: "rgba(129,196,247,0)"
							}
						},
						data: [1,1,1]
					});

				},
				onUpdate: function() {
					cur._privateVars.myEcharts.setOption(option, true);
				}
			}, "begining")
			.to(option.series[0].title.textStyle, .6, {
				color: "rgba(80,167,189,1)"
			}, "begining")
			.to($img, .4, {
				opacity: 1
			}, "begining")
			.to($div, .4, {
				opacity: 1
			}, "begining")
			.to(option.series[0].data[0], 3, {
				ease: Power2.easeInOut,
				value: this._privateVars.data[this._privateVars.configData["value"]],
				onStart: function() {
					option.series[0].pointer.length = "100%";
					option.series[0].pointer.width = 4;
				},
				onUpdate: function() {
					$div.find(".p1").text(Math.ceil(option.series[0].data[0].value));

					cur._privateVars.myEcharts.setOption(option, true);
				},
				onComplete:function(){
					cur._privateVars.isStart = false;
				}
			}, "numShow");
	}

	loopAnimation(option) {
		var cur = this;
		cur._privateVars.myEcharts.setOption(option, true);
		var $dom = $(cur._privateVars.myEcharts.getDom());
		var $img = $dom.siblings("img.rollImg");
		if (this._privateVars.loopTween instanceof TweenMax)
			this._privateVars.loopTween.kill();

		var t = {
			per: 0
		};
		var angle = 0;
		this._privateVars.loopTween = TweenMax.to(t, 1.6, {
			per: 1,
			onRepeat: function() {
				if (Math.random() > .7) {
					option.series[0].axisLine.lineStyle.color[0] = [0.52, 'rgba(50,181,158,' + (0.3 + Math.random() * .3) + ')'];
				} else
					option.series[0].axisLine.lineStyle.color[0] = [0.52, 'rgba(50,181,158,' + 0.3 + ')'];

				if (Math.random() > .8) {
					option.series[0].axisLine.lineStyle.color[1] = [0.77, 'rgba(253,186,80,' + (0.3 + Math.random() * .3) + ')'];
				} else
					option.series[0].axisLine.lineStyle.color[1] = [0.77, 'rgba(253,186,80,' + 0.3 + ')'];

				if (Math.random() > .6) {
					option.series[0].axisLine.lineStyle.color[2] = [1, 'rgba(135,38,41,' + (0.3 + Math.random() * .3) + ')'];
				} else
					option.series[0].axisLine.lineStyle.color[2] = [1, 'rgba(135,38,41,' + 0.3 + ')'];

				cur._privateVars.myEcharts.setOption(option, true);
			}, onUpdate: function(){
			angle += 5;
			$img.css({ transform: "translate(-50%, -50%) rotate("+angle+"deg)" })
		},
			repeat: -1
		});
	};
}
module.exports = ZnfwXysj;