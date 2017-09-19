const zrender = require('zrender');
const IsogonShape = require('zrender/lib/graphic/shape/Isogon');
const LineShape = require("zrender/lib/graphic/shape/Line");
const lineLight = require('../lineLight.js');

function leadLine(dom) {
	let $dom = $(dom);
	let myZr = zrender.init(dom);
	let $boxcenter = $('#boxcenter');
	let lineArr = [{
		percent: 0,
		x1: 0,
		y1: 0,
		x2: 122,
		y2: 70
	}, {
		percent: 0,
		x1: 786,
		y1: 0,
		x2: 668,
		y2: 70
	}, {
		percent: 0,
		x1: 0,
		y1: 456,
		x2: 118,
		y2: 266
	}, {
		percent: 0,
		x1: 786,
		y1: 456,
		x2: 670,
		y2: 265
	}, {
		percent: 0,
		x1: 390,
		y1: 395,
		x2: 442,
		y2: 324
	}];

	var lines = [];
	var isogons = [];
	for (var i = 0; i < lineArr.length; i++) {
		var line = new LineShape({
			shape: lineArr[i],
			style: {
				stroke: 'rgba(102,255,255,0.2)',
				lineDash: [2, 2]
			}
		});
		lines.push(line);
		myZr.add(line);

		var isogon1 = new IsogonShape({
			shape: {
				x: lineArr[i].x2,
				y: lineArr[i].y2,
				r: 0,
				n: 6
			},
			style: {
				fill: '#66ffff'
			}
		});
		var isogon2 = new IsogonShape({
			shape: {
				x: lineArr[i].x2,
				y: lineArr[i].y2,
				r: 0,
				n: 6
			},
			style: {
				stroke: '#66ffff',
				fill: 'none'
			}
		});
		isogon1.hide();
		isogon2.hide();
		isogons.push(isogon1);
		isogons.push(isogon2);
		myZr.add(isogon1);
		myZr.add(isogon2);
	}
	var count = 0;
	for (var i = 0; i < lines.length; i++) {
		lines[i].animateShape().when(600, {
			percent: 1
		}).delay(3000).start().done(function() {
			count++;
			if (count == 5) {
				for (var i = 0; i < isogons.length; i++) {
					isogons[i].show();
					isogons[i].animateShape().when(200, {
						r: (i % 2 == 0 ? 4 : 6)
					}).start();
				}
				for (var i = 0; i < lineArr.length; i++) {
					lineLight({
						zr:myZr,
						x:lineArr[i].x1,
						y:lineArr[i].y1,
						tX:lineArr[i].x2,
						tY:lineArr[i].y2,
						delay:1000
					});
				}
			}
		});

	}

	var t7 = new TweenMax($boxcenter, 1, {
		top: 150,
		opcity: 1,
		ease: Back.easeOut.config(3.5),
		delay: 2.4,
		onComplete: function() {
			$('.d-value').each(function(idx, ele) {
				var json = {
					value: $(ele).html()
				};
				var end = $(ele).attr('data-end');
				new TweenMax(json, 1, {
					value: end,
					ease: Linear.easeNone,
					onUpdate: function() {
						$(ele).html(Math.round(json.value));
					}
				})
			})
		}
	})

	var zAngle = {
		per: 0
	};
	var zRotateAngle = 0;

	var t8 = new TweenMax(zAngle, 1, {
		per: 1,
		ease: Power4.easeOut,
		delay: 2.4,
		onUpdate: function() {
			zRotateAngle = 90 * (zAngle.per - 1);

			$boxcenter.css({
				transform: "perspective(500px) rotateX(" + zRotateAngle + "deg) scale(" + (zAngle.per * 0.3 + 0.7) + "," + (zAngle.per * 0.3 + 0.7) + ")"
			});
		}
	})
}
module.exports = leadLine;