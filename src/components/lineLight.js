const LineGradient = require("zrender/lib/graphic/LinearGradient.js");
const CircleShape = require("zrender/lib/graphic/shape/Circle.js");
const groupShape = require("zrender/lib/container/Group");
const LineShape = require("zrender/lib/graphic/shape/Line");
/**
 * 生成光线的类
 * opts的参数
 * @param  {[zrender]} zr        zrender init实例
 * @param  {[int]} x         线起点x值
 * @param  {[int]} y         线起点y值
 * @param  {[int]} tX        线终点x值
 * @param  {[int]} tY        线终点y值
 * @param  {[int]} during    运动持续时间
 * @param  {[int]} delay     运动间隔时间
 * @param  {[string]} rgbaColor   default值 'rgba(255,255,255,1)'
 * @param  {[function]} fn   每次运动完执行的函数
 * @param  {[未知类型]} param   调用时传入的参数
 * @return {[zrender]}       lineShape 实例
 */

function lineAnimate(opts){
	opts.during = opts.during || 2000;
	opts.delay = opts.delay || 0;
	let x = opts.x;
	let y = opts.y;
	let tX = opts.tX;
	let tY = opts.tY;

	let lineW = Math.sqrt((x-tX)*(x-tX)+(y-tY)*(y-tY));
	opts.rgbaColor = opts.rgbaColor || 'rgba(255,255,255,1)';
	let color = new LineGradient(0,0,0,1,[{
		offset:0,
		color:opts.rgbaColor
	},{
		offset:0.5,
		color:opts.rgbaColor.substring(0,opts.rgbaColor.lastIndexOf(','))+',0)'
	},{
		offset:1,
		color:opts.rgbaColor.substring(0,opts.rgbaColor.lastIndexOf(','))+',0)'
	}],false);

	let LimitGroup = new groupShape();
	let circle = new CircleShape({
		shape:{
			cx:x,
			cy:y,
			r:lineW
		}
	});
	LimitGroup.setClipPath(circle);
	opts.zr.add(LimitGroup);
	
	let Line = new LineShape({
		shape:{
			x1:x,
			y1:y,
			x2:x,
			y2:y-lineW*2,
			percent:0
		},
		origin:[x,y],
		rotation:Math.acos((y-tY)/lineW)*(tX-x>0?-1:1),
		style:{
			stroke: color,
			lineWidth:2
		}
	})

	callSelft(Line,opts.during,opts.delay);

	function callSelft(Line,during,delay){
		Line.animateShape().when(during,{percent:1}).delay(delay).start().done(function(){
			Line.shape.percent = 0;
			opts.perFn && opts.perFn(opts.param);
			callSelft(Line,during,delay);
		});
	}

	LimitGroup.add(Line);
	opts.zr.add(Line);

	return Line;
}

module.exports = lineAnimate;