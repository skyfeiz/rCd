const zrender = require('zrender');
const CircleShape = require("zrender/lib/graphic/shape/Circle.js");
const TextShape = require("zrender/lib/graphic/Text.js");
const ImageShape = require("zrender/lib/graphic/Image.js");
const RectShape = require("zrender/lib/graphic/shape/Rect.js");
const PolylineShape = require("zrender/lib/graphic/shape/Polyline");
const PolygonShape = require('zrender/lib/graphic/shape/Polygon');
const Group = require("zrender/lib/container/Group");
class XhjBox1Chart3 {
	constructor(dom) {
		this.zr = zrender.init(dom);
		this.init();
	}

	init(){
		let _this = this;
		let vec2_s = {
			x:70,
			y:156
		};
		let vec2_z = {
			x:178,
			y:53
		};
		this.createCircle(vec2_s,'售',function(){
			_this.createLines(function(){
				_this.createCircle(vec2_z,'租');
			})
		});
	}

	createCircle(vec2,name,complete){
		let _this = this;
		// 圆分割段数
		let n = 6;
		//	售
		let circle = new CircleShape({
			shape:{
				cx:vec2.x,
				cy:vec2.y,
				r:32,
			},
			origin:[vec2.x,vec2.y],
			rotation:0,
			style:{
				fill:'none',
				stroke:'#fff',
				lineWidth:5,
				lineDash:[Math.PI*2/n*4/5*32,Math.PI*2/n*1/5*32],
				shadowBlur:20,
				shadowColor:'#3197d9'
			}
		})
		let text = new TextShape({
			style:{
				x:vec2.x,
				y:vec2.y-2,
				text:name,
				fill:'#fff',
				textFont : 'normal 30px Microsoft Yahei',
				textAlign : 'center',
				textBaseline : 'middle'
			}
		})
		circle.animate().when(500,{
			rotation:-Math.PI/2
		}).start().done(function(){
			_this.zr.add(text);
			complete && complete();
		})
		_this.zr.add(circle);
	}

	createLines(complete){
		let sX = 106;
		let sY = 118;

		let group = new Group();
		this.zr.add(group);
		let rect = new RectShape({
			shape:{
				x:sX-3,
				y:sY-1,
				width:0,
				height:5
			},
			origin:[sX-3,sY-1],
			rotation:Math.PI*2/360*45
		})      
		group.setClipPath(rect);

		let lines = new PolylineShape({
			shape:{
				points:[
					[sX,sY],
					[sX+14,sY-14],
					[sX+22,sY-6],
					[sX+34,sY-18]
				],
				percent:0
			},
			style:{
				stroke:'#40bfbf',
				lineWidth:5
			}
		})
		group.add(lines);
		let polygon = new PolygonShape({
			shape:{
				points:[
					[sX+28,sY-24],
					[sX+40,sY-24],
					[sX+40,sY-12]
				]
			},
			style:{
				fill:'#40bfbf',
				stroke:'none'
			}
		})
		group.add(polygon);

		rect.animateShape().when(300,{
			width:24
		}).when(500,{
			height:17
		}).when(1000,{
			width:60,
			height:200
		}).start().done(function(){
			complete && complete();
		});
	}

}
module.exports = XhjBox1Chart3;