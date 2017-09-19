import zrender from "zrender";
import LineShape from"zrender/lib/graphic/shape/Line.js";
import CircleShape from"zrender/lib/graphic/shape/Circle.js";
import PolygonShape from"zrender/lib/graphic/shape/Polygon.js";
import Image from"zrender/lib/graphic/Image.js";
import Text from"zrender/lib/graphic/Text.js";
import Group from "zrender/lib/container/Group";

class Middle {
	constructor(dom) {
		this.zr = new zrender.init(dom);
		this.W = $(dom).width();

		this.EventDispatcher = $({});

		this.ctx = document.createElement('canvas').getContext('2d');
		this.vec2 = {
			x:this.W/2,
			y:350
		}

		this.imgArr = ['imgs/p3/light1.png','imgs/p3/inerCircle.png','imgs/p3/outCircle.png','imgs/p3/lightCircle.png','imgs/p3/vecCircle.png'];
		this.$video = $('#video');
		this.init();
	}

	init(){
		let _this = this;
		let nImg = 0;
		this._group = new Group();

		// 预加载图片
		for (var i = 0; i < _this.imgArr.length; i++) {
			var img = new window.Image();
			img.src = this.imgArr[i];
			img.onload = function(){
				nImg++;
				if (nImg == _this.imgArr.length) {
					_this.EventDispatcher.trigger('initP3');
					_this.zr.add(_this._group);
					_this._group.origin = [_this.vec2.x,_this.vec2.y];
					_this._group.scale = [0.1,0.1];
					_this.initEarth();
					_this._group.animate().when(1000,{
						scale:[1,1]
					}).start('cubicOut').done(function(){
						// _this.earthOut();
						_this.initInfo();
					});
				}
			}
			img.onerror = function(){
				console.log('error');
				console.log(this.src);
			}
		}
	}

	earthOut(){
		let _this = this;
		this._group.per = 1;
		this._group.animate().when(2000,{
			per:0
		}).start('cubicOut').during(function(){
			for (var i = 0; i < _this._group._children.length; i++) {
				let item = _this._group._children[i];
				if (item.style) {
					item.style.opacity = _this._group.per;
				}else{
					for (var j = 0; j < item._children.length; j++) {
						 item._children[j].style.opacity = _this._group.per;
					}
				}
			}
			_this.$video.css('opacity',(1-_this._group.per))
		}).done(function(){
			_this.EventDispatcher.trigger('animateComplete');
		});
	}

	initEarth(){
		let vec2 = this.vec2;

		// light1 1163*1450
		let w1 = 1163,h1 = 1450;
		let light1 = new Image({
			style:{
				x:vec2.x - w1/4,
				y:vec2.y - h1/4,
				width:w1/2,
				height:h1/2,
				image:'imgs/p3/light1.png'
			}
		})
		this._group.add(light1);

		let outGroup = new Group();
		outGroup.origin = [vec2.x,vec2.y];
		this._group.add(outGroup);
		// inner 876*1093
		let w2 = 410,h2 = 410;
		let image2 = new Image({
			style:{
				x:vec2.x - w2/4,
				y:vec2.y - h2/4,
				width:w2/2,
				height:h2/2,
				image:'imgs/p3/inerCircle.png'
			},
			origin:[vec2.x,vec2.y]
		})
		this._group.add(image2);
		image2.animate('',true).when(12000,{
			rotation:-Math.PI*2
		}).start();

		// out 876*1093
		let w3 = 876,h3 = 1093;
		let image3 = new Image({
			style:{
				x:vec2.x - w3/4 + 3,
				y:vec2.y - h3/4 + 8,
				width:w3/2,
				height:h3/2,
				image:'imgs/p3/outCircle.png'
			},
			origin:[vec2.x,vec2.y]
		});
		outGroup.add(image3);

		// lightCircle 885*884
		let w4 = 885,h4 = 884;
		let image4 = new Image({
			style:{
				x:vec2.x - w4/4,
				y:vec2.y - h4/4,
				width:w4/2,
				height:h4/2,
				image:'imgs/p3/lightCircle.png'
			},
			origin:[vec2.x,vec2.y]
		})
		outGroup.add(image4);
		outGroup.animate('',true).when(12000,{
			rotation:Math.PI*2
		}).start();

		// 虚线圆circle
		let imageW = 454;
		let imageCircle = new Image({
			style:{
				x:vec2.x - imageW/2,
				y:vec2.y - imageW/2,
				image:'imgs/p3/vecCircle.png',
				width:imageW,
				heigth:imageW
			}
		})
		this.zr.add(imageCircle);
	}

	initInfo(){
		let _this = this;
		let vec2 = {
			x:this.W/2,
			y:350
		}
		let timeArr = [300,200,500,100];
		
		// 实线
		let lineImageArr = [
			{r:300,deg:60,image:'imgs/p3/middle_c1.png',width:157},
			{r:260,deg:90,image:'imgs/p3/middle_c2.png',width:56},
			{r:270,deg:105,image:'imgs/p3/middle_c3.png',width:196},
			{r:250,deg:130,image:'imgs/p3/middle_c4.png',width:88},
			{r:230,deg:220,image:'imgs/p3/middle_c5.png',width:104},
			{r:290,deg:240,image:'imgs/p3/middle_c6.png',width:129},
			{r:260,deg:270,image:'imgs/p3/middle_c7.png',width:79},
			{r:260,deg:290,image:'imgs/p3/middle_c8.png',width:260},
			{r:260,deg:315,image:'imgs/p3/middle_c9.png',width:56}
		];
		for (var i = 0; i < lineImageArr.length; i++) {
			let src = lineImageArr[i].image;
			let w = lineImageArr[i].width / 2;
			let o0 = this.getPointPos(vec2,200,lineImageArr[i].deg);
			let o1 = this.getPointPos(vec2,lineImageArr[i].r+w/2,lineImageArr[i].deg);
			let image = new Image({
				style:{
					x:o1.x - w/2,
					y:o1.y - w/2,
					width:w,
					height:w,
					image:src
				},
				z:5
			});

			let line = new LineShape({
				shape:{
					x1:o0.x,
					y1:o0.y,
					x2:o1.x,
					y2:o1.y,
					percent:0
				},
				z:5,
				style:{
					stroke:'#2289a5',
				}
			});
			this.zr.add(line);
			line.animateShape().when(timeArr[0],{
				percent:1
			}).delay(timeArr[1]*i).start('cubicOut').done(function(){
				_this.zr.add(image);
			});
		}

		//  虚线
		let dashArr = [
			{r:470,deg:70,textName:'设备成本(元)',textValue:170000},
			{r:670,deg:80,textName:'针/每头每分钟',textValue:1000},
			{r:450,deg:90,textName:'一天产量(万针)',textValue:3456},
			{r:640,deg:95,textName:'每天分钟',textValue:1440},
			{r:580,deg:110,textName:'针头数',textValue:24},

			{r:540,deg:290,textName:'回本周期(天)',textValue:439.19},
			{r:650,deg:280,textName:'每天净利润(20%)',textValue:387.07},
			{r:460,deg:270,textName:'每天收入(元)',textValue:1935.36},
			{r:680,deg:260,textName:'每天平均开工率(%)',textValue:70},
			{r:460,deg:250,textName:'每万针单价(元)',textValue:'0.80'},
		];
		let nCount = 0;
		for (var i = 0; i < dashArr.length; i++) {
			let deg = dashArr[i].deg;
			let o0 = _this.getPointPos(vec2,200,deg);
			let o1 = _this.getPointPos(vec2,dashArr[i].r,deg);
			let name = dashArr[i].textName;
			let value = dashArr[i].textValue;
			
			let line = new LineShape({
				shape:{
					x1:o0.x,
					y1:o0.y,
					x2:o1.x,
					y2:o1.y,
					percent:0
				},
				z:4,
				style:{
					stroke:'#2289a5',
					lineDash:[2,3]
				}
			})
			_this.zr.add(line);

			// 三角
			let dis = deg>180?8:-8;
			let polygon = new PolygonShape({
				shape:{
					points:[
						[o1.x,o1.y],
						[o1.x + dis,o1.y - dis],
						[o1.x + dis,o1.y + dis],
					]
				},
				z:4,
				style:{
					fill:'#2289a5'
				}
			})

			let fontName = 'normal 18px Microsoft Yahei';
			let fontValue = 'normal 50px DIN MEDIUM';
			let nameWidth = _this.measureText(name,fontName);
			let valueWidth = _this.measureText(value,fontValue);

			let tName = new Text({
				style:{
					x:o1.x + (deg>180?1:-1) * (nameWidth/2 + 10),
					y:o1.y + 6,
					text:name,
					textFont:fontName,
					fill:'#66ffff',
					textAlign:'center',
					textBaseLine:'middle',
					opacity:0
				},
				z:4
			})

			let tValue = new Text({
				style:{
					x:o1.x + (deg>180?1:-1) * (valueWidth/2 + 10) + (deg<180?(valueWidth - nameWidth):0),
					y:o1.y - 20,
					text:value,
					textFont:fontValue,
					fill:'#66feff',
					textAlign:'center',
					textBaseLine:'middle',
					opacity:0,
					shadowBlur:10,
					shadowColor:'#3197d9'
				},
				z:4
			})
			
			line.animateShape().when(timeArr[2],{
				percent:1
			}).delay(timeArr[3]*i + timeArr[0] + timeArr[1]*lineImageArr.length).start('cubicOut').done(function(){
				_this.zr.add(polygon);
				_this.zr.add(tName);
				_this.zr.add(tValue);
				tName.animateStyle().when(500,{
					opacity:1,
				}).start();
				tValue.animateStyle().when(500,{
					opacity:1,
				}).start();
				nCount++;
				if (nCount == dashArr.length) {
					_this.earthOut();
				}
			})
		}
	}

	getAxisHelp(x,y,size){
		let Liney = new LineShape({
			shape:{
				x1:x,
				y1:y+size,
				x2:x,
				y2:y-size
			},
			style:{
				stroke:'red'
			}
		})
		let Linex = new LineShape({
			shape:{
				x1:x-size,
				y1:y,
				x2:x+size,
				y2:y
			},
			style:{
				stroke:'blue'
			}
		})
		this.zr.add(Linex);
		this.zr.add(Liney);
	}

	getPointPos(vec2,r,deg){
		let rad = this.reg2rad(deg);
		return {
			x:vec2.x - r*Math.sin(rad),
			y:vec2.y - r*Math.cos(rad)
		}
	}

	// 角度转弧度
	reg2rad(deg){
		return Math.PI*deg/180;
	}

	// 计算文字的宽
	measureText(text, font) {
        this.ctx.font = font;
        return this.ctx.measureText(text).width;
    }
}	

module.exports = Middle;