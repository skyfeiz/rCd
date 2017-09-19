const zrender = require('zrender');
const PolygonShape = require('zrender/lib/graphic/shape/Polygon');
const IsogonShape = require('zrender/lib/graphic/shape/Isogon');
const LineShape = require("zrender/lib/graphic/shape/Line");
const TextShape = require("zrender/lib/graphic/Text");
const RectShape = require("zrender/lib/graphic/shape/Rect");

var $centerNut, $nut1, mainTimeLine, $bgCover;

function initAnimation(opts) {
	opts = opts || {};
	$bgCover = $("#BG .bgCover");
	$centerNut = $("#BG .img1");
	$nut1 = $("#BG .img2");
	mainTimeLine = new TimelineMax();

	mainTimeLine.addLabel("t1", 0);
	mainTimeLine.addLabel("t3", 0.5);
	mainTimeLine.addLabel("t2", 1);
	mainTimeLine.addLabel("t5", 1);
	mainTimeLine.addLabel("t6", 1.4);
	$('.element-div').each(function(index, ele) {
		if ($(ele).hasClass('znfw_chart4')) {return}
		var clone = $('.z_clone').clone();
		clone.removeClass('z_clone');
		$(ele).prepend(clone);
	});
	opts.borderfn&&opts.borderfn();
	enterAni(opts.bgComplete);
	transformSet();
};

function enterAni(fn) {
	var angle = {
		per: 0
	}
	var rotateSpeed = 0.1;
	var rotateAngle = 0;

	var t1 = new TweenMax(angle, 1, {
		per: 1,
		ease: Linear.easeNone,
		onUpdate: function() {
			rotateSpeed = Math.sin(angle.per);
			rotateAngle += rotateSpeed;

			$centerNut.css({
				transform: "rotate(" + rotateAngle + "deg)"
			});
			$nut1.css({
				transform: "rotate(-" + rotateAngle * 3 + "deg)"
			});
		}
	});

	var t2 = new TweenMax(angle, 5, {
		per: 0,
		ease: Linear.easeNone,
		onUpdate: function() {
			rotateAngle += rotateSpeed;

			$centerNut.css({
				transform: "rotate(" + rotateAngle + "deg)"
			});
			$nut1.css({
				transform: "rotate(-" + rotateAngle * 3 + "deg)"
			});
		},
		repeat: -1
	});

	var t3 = new TweenMax($bgCover, 0.5, {
		opacity: 1,
		ease: RoughEase.ease.config({
			template: Power0.easeNone,
			strength: 1.5,
			points: 20,
			taper: "none",
			randomize: true,
			clamp: false
		}),onComplete: function onComplete() {
			fn && fn();
		}
	});


	mainTimeLine.add(t1, "t1");
	mainTimeLine.add(t2, "t2");
	mainTimeLine.add(t3, "t3");
};

function transformSet() {
	$(".transformBG").each(function() {
		var curDelay = Math.random() * 0.4;
		var t6 = new TweenMax($(this).parent(), 1.2, {
			transform: "translate(0,0)",
			ease: Elastic.easeOut.config(0.5, 0.3),
			delay: curDelay,
			onCompleteParams: [$(this)],
			onComplete: function(a) {
				if (a.hasClass('znfw_chart4')) {return}
				a.trigger('initChart');
			}
		});
		mainTimeLine.add(t6, "t6");

		$(this).find(".transformBox1").children().each(function(i, val) {
			$(this).css({
				left: $(this).attr("mark-Left") ? Math.random() * 400 : "auto",
				right: $(this).attr("mark-right") ? Math.random() * 400 : "auto",
				top: $(this).attr("mark-top") ? Math.random() * 280 : "auto",
				transform: $(this).attr("mark-top") ? "rotate(" + (parseInt($(this).attr("mark-rotate")) + (-0.5 + Math.random()) * 20) + "deg)" : "rotate(0deg)"
			});

			transformAni($(this), i, curDelay);
		});
		$(this).find(".transformBox2").children().each(function(i, val) {
			$(this).css({
				left: $(this).attr("mark-Left") ? Math.random() * 400 : "auto",
				right: $(this).attr("mark-right") ? Math.random() * 400 : "auto",
				top: $(this).attr("mark-top") ? Math.random() * 280 : "auto",
				transform: $(this).attr("mark-top") ? "rotate(" + (parseInt($(this).attr("mark-rotate")) + (-0.5 + Math.random()) * 90) + "deg)" : "rotate(0deg)"
			});

			transformAni($(this), i, curDelay);
		});
	});
};

function transformAni(element, index, baseDelay) {
	var curDelay = .03 * index + baseDelay;
	var t = new TimelineMax({
			delay: curDelay
		})
		.to(element, .3, {
			opacity: 1
		}, 0)
		.to(element, .3, {
			transform: "rotate(" + element.attr("mark-rotate") + "deg)"
		}, 0.1);

	if (element.attr("mark-Left")) {
		var ease = Power2.easeInOut;
		var delay = .2;
		if (element.attr("mark-side") == "left") {
			ease = Back.easeOut.config(1);
			delay = .5;
		}
		t.to(element, .6, {
			left: element.attr("mark-Left"),
			ease: ease
		}, delay);
	}
	if (element.attr("mark-top")) {
		var ease = Power2.easeInOut;
		var delay = .2;
		if (element.attr("mark-side") == "top") {
			ease = Back.easeOut.config(1);
			delay = .5;
		}
		t.to(element, .6, {
			top: element.attr("mark-top"),
			ease: ease
		}, delay);
	}
	if (element.attr("mark-bottom")) {
		var ease = Power2.easeInOut;
		var delay = .2;
		if (element.attr("mark-side") == "top") {
			ease = Back.easeOut.config(1);
			delay = .5;
		}
		t.to(element, .6, {
			bottom: element.attr("mark-bottom"),
			ease: ease
		}, delay);
	}
	if (element.attr("mark-right")) {
		var ease = Power2.easeInOut;
		var delay = .2;
		if (element.attr("mark-side") == "right") {
			ease = Back.easeOut.config(1);
			delay = .5;
		}
		t.to(element, .6, {
			right: element.attr("mark-right"),
			ease: ease
		}, delay);
	}

	mainTimeLine.add(t, "t5");
};
module.exports = initAnimation;
