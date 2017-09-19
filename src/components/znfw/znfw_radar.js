const zrender = require('zrender');
const PolylineShape = require("zrender/lib/graphic/shape/Polyline");
const PolygonShape = require('zrender/lib/graphic/shape/Polygon');
const LineShape = require("zrender/lib/graphic/shape/Line.js");
const CircleShape = require("zrender/lib/graphic/shape/Circle.js");
const TextShape = require("zrender/lib/graphic/Text.js");
const RectShape = require("zrender/lib/graphic/shape/Rect.js");
const Group = require("zrender/lib/container/Group");
const lineLight = require('../lineLight.js');

class ZnfwRadar {
	constructor(dom) {
		this.$dom = $(dom);
		this.zr = zrender.init(dom);
	}

	setConfig(value) {
		this._config = value;
	}

	setDataProvider(value) {
		this._dataProvider = value;
		this.creationContent();
	}

	creationContent() {
		let center = [0.5,0.6];
		let W = this.$dom.width();
		let H = this.$dom.height();
		let R = H*0.3;
		let vec2 = {x:W*center[0],y:H*center[1]};

		let seriesData = [];
		let data = [];
		let nameJson = {};
		let nameArr = [];
		let seriesGroup = new Group();
		let nameGroup = new Group();

		for (let i = 0; i < this._dataProvider.length; i++) {
			let item = this._dataProvider[i];
			seriesData.push(item.seriesName)
			let arr = [];
			for (let j = 0; j < item.dataList.length; j++) {
				nameJson[item.dataList[j].name] = 1;
				arr.push(item.dataList[j].value);
			}
			data.push(arr);
		}
		for (let key in nameJson) {
			nameArr.push(key);
		}

		// 图例
		let text1 = new TextShape({
			style:{
				x:169,
				y:60,
				text:seriesData[0],
				fill:'#50a7bd'
			}
		})
		let text1Rect = new RectShape({
			shape:{
				x: 145,
          		y: 52,
				width:15,
				height:6
			},
			style:{
				fill:'#7eb2e6'
			}
		})

		this.zr.add(text1);
		this.zr.add(text1Rect);
		let text2 = new TextShape({
			style:{
				x:264,
				y:60,
				text:seriesData[1],
				fill:'#50a7bd'
			}
		})
		let text2Rect = new RectShape({
			shape:{
				x:244,
				y:52,
				width:15,
				height:6
			},
			style:{
				fill:'#00dcff'
			}
		})
		this.zr.add(text2);
		this.zr.add(text2Rect);

		//	画雷达背景网格
		for (var i = 0; i < 5; i++) {
			let r = R/5*(i+1);
			let basePoints = this.getPointsVec2(vec2,[r,r,r,r,r]);
			this.drawPolyLine(basePoints,'#05758b');
			//	底色下标
			this.drawText((basePoints[0][0]+basePoints[1][0])/2,(basePoints[0][1]+basePoints[1][1])/2,(i+1)*20,'#50a7bd');
		}

		//  *线
		let topPoints = this.getPointsVec2(vec2,[R+20,R+20,R+20,R+20,R+20]);

		this.drawLine(vec2,topPoints,'#52a4f6');
		// name
		let TextPos = this.getPointsVec2(vec2,[R+30,R+40,R+40,R+40,R+40]);
		for (var i = 0; i < nameArr.length; i++) {
			this.drawText(TextPos[i][0],TextPos[i][1],nameArr[i],'#50a7bd',undefined,14);
		}

		// 画系列
		let colorArr=['rgba(255,255,255,1)','rgba(0,220,255,1)'];
		let colorArr2=['rgba(126,178,230,0.05)','rgba(0,220,255,0.05)'];
		let colorShadowArr = ['#7eb2e6','#00dcff'];

		let point2Arr = []; 
		for (let i = 0; i < data.length; i++) {
			// 	点坐标
			let itemPos = this.getPointsVec2(vec2,data[i].map(function(n){
				return n/100*R;
			}));
			point2Arr.push(itemPos);
			// 	name坐标
			let s1Pos = this.getPointsVec2(vec2,data[i].map(function(n){
				return n/100*R+(i==0?-1:1)*20;
			}));

			seriesGroup.add(this.drawPolygon(itemPos,colorArr2[i]));
			seriesGroup.add(this.drawPolyLine(itemPos,colorArr[i],{blur:10,color:colorArr[i]}));

			for (var j = 0; j < itemPos.length; j++) {
				seriesGroup.add(this.drawPoints(itemPos[j][0],itemPos[j][1],4,'#fff',{blur:5,color:colorArr[i]}));
				nameGroup.add(this.drawText(s1Pos[j][0],s1Pos[j][1],data[i][j]+'%','#fff',{blur:10,color:colorShadowArr[i]}));
			}
		}

		this.zr.add(seriesGroup);
        this.zr.add(nameGroup);
        for (var i = 0; i < nameGroup._children.length; i++) {
            nameGroup._children[i].hide();
        }

        seriesGroup.scale = [0.2,0.2];
        seriesGroup.origin = [vec2.x,vec2.y];
        let _this = this;
        seriesGroup.animate('',false).when(1000,{scale:[1,1]}).start().done(function(){
            for (var i = 0; i < nameGroup._children.length; i++) {
                nameGroup._children[i].show();
            }
            for (var i = 0; i < point2Arr[0].length; i++) {
            	lineLight({
            		zr:_this.zr,
            		x:point2Arr[0][i][0],
            		y:point2Arr[0][i][1],
            		tX:point2Arr[1][i][0],
            		tY:point2Arr[1][i][1]
            	});
            }
        });

	}

	/**
	 * 根据中心点和五个方向上的值的,计算五边形的坐标
	 * @param  {[vec2]} vec2 中心点的xy值
	 * @param  {[array]} 	r1   	五个点距离中心的长度
	 * @return {[[array]]}   二维数组
	 */
	
	getPointsVec2(vec2,arr){
		var rtnArr = [];
		for (let i = 0; i < 5; i++) {
			let deg = 360/5*i;
			let x = vec2.x - Math.sin(this.reg2rad(deg))*arr[i];
			let y = vec2.y - Math.cos(this.reg2rad(deg))*arr[i];
			rtnArr.push([x,y]);
		}
		return rtnArr;
	}

	/**
	 * [drawPolygon description]
	 * @param  {[array]} arr   多边形点的坐标
	 * @param  {[hex]} color 颜色值
	 */
	drawPolygon(arr,color){
		let  polygon = new PolygonShape({
			shape: {
				points: arr
			},
			style: {
                fill:color
			}
		})
		this.zr.add(polygon);
		return polygon;
	}

	/**
	 * [drawPolyLine description]
	 * @param  {[array]} arr   多边形点的坐标
	 * @param  {[hex]} color 颜色值
	 * @param  {[json]} shadow  .blur .color
	 */
	drawPolyLine(arr,color,shadow){
		let polyLine = null;
		if (shadow!==undefined) {
			polyLine = new PolylineShape({
				shape:{
					points:arr.concat([arr[0]])
				},
				style:{
					stroke: color,
					shadowBlur:shadow.blur,
					shadowColor:shadow.color
				}
			})
		}else{
			polyLine = new PolylineShape({
				shape:{
					points:arr.concat([arr[0]])
				},
				style:{
					stroke: color,
					lineDash:[2,2]
				}
			});
		}
		this.zr.add(polyLine);
		return polyLine;
	}

	drawText(x,y,text,color,shadow,size){
		size = size || 12;
		shadow = shadow || {blur:0,color:'#000'};
		let Text = new TextShape({
			style:{
				x:x,
				y:y,
				text:text,
				textFont : 'normal '+size+'px DIN MEDIUM',
				textAlign : 'center',
				textVerticalAlign:'middle',
				fill:color,
				shadowBlur:shadow.blur,
				shadowColor:shadow.color
			}
		})
		this.zr.add(Text);
		return Text;
	}

	drawLine(vec2,arr,color){
		let group = new Group();
		for (let i = 0; i < arr.length; i++) {
			let itargetX = arr[i][0];
			let itargetY = arr[i][1];
			let line = new LineShape({
				shape: {
					x1:vec2.x,
                    y1:vec2.y,
                    x2:itargetX,
                    y2:itargetY
				},
				style:{
					stroke:color
				}
			})
			this.drawPoints(arr[i][0],arr[i][1],2,'#66ffff');
			this.zr.add(line);
			group.add(line);		
		}

		return group;
	}

	drawPoints(x,y,r,color,shadow){
		shadow = shadow || {shadowBlur:0,shadowColor:'#000'}
		let circle = new CircleShape({
			shape:{
				cx:x,
				cy:y,
				r:r
			},
			style:{
				fill:color,
				shadowBlur:shadow.blur,
				shadowColor:shadow.color
			}
		})
		this.zr.add(circle);
		return circle;
	}

	// 角度转弧度
	reg2rad(deg){
		return Math.PI*deg/180;
	}
}

module.exports = ZnfwRadar;