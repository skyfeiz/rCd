import zrender from "zrender";
import Rect from "zrender/lib/graphic/shape/Rect";
import Line from "zrender/lib/graphic/shape/Line";
import Circle from "zrender/lib/graphic/shape/Circle";
import Arc from "zrender/lib/graphic/shape/Arc";
import Polyline from "zrender/lib/graphic/shape/Polyline";
import Polygon from "zrender/lib/graphic/shape/Polygon";
import Isogon from "zrender/lib/graphic/shape/Isogon";
import Text from "zrender/lib/graphic/Text";
import RadialGradient from "zrender/lib/graphic/RadialGradient.js";
import LinearGradient from "zrender/lib/graphic/LinearGradient.js";
import Group from "zrender/lib/container/Group";
import lineLight from "../lineLight.js";


class ZnfwXfl {
	constructor(dom) {
		this._dom = dom;
		this.zr = zrender.init(this._dom);
		this.init();
		this.width = this.zr.getWidth();
		this.height = this.zr.getHeight();
		this.colorlist = [ "rgba(126,178,260,1)","rgba(0,250,255,1)", "rgba(1,198,255,1)", "rgba(153,153,255,1)", "rgba(255,147,38,1)", "rgba(0,102,102,1)"];
		this.colorlistAlert = ["#66ffff", "#d1e3ff"];
	}
	init() {

	}
	clear() {
			this.zr.clear();
		}
		//封装配置信息
	setConfig(value) {
			this._config = value;
			this.creationContent();
		}
		//封装数据提供
	setDataProvider(value) {
		this._dataProvider = value;
		this.creationContent();
	}
	resize(value) {
		this._resize = value;
		this.creationContent();
	}
	creationContent() {
		this.hasRender;
		if (this.hasRender) {
			this.zr.clear();
		}
		if (this._config == null || this._dataProvider == null || this._resize == null) return;
		const _this = this;
		this._showPolyNum = this._config.nameField.length;
		let _DataArr = [];
		let _timeArr = [];
		this._dataProvider.map(function(value, index) {
			_this._config.nameField.push(value[_this._config['seriesName']]);
			value[_this._config['dataList']].map(function(ele, ind) {
				if (index == 0) {
					_timeArr.push(ele[_this._config['name']]);
				}
			})
		});

		this._length = _timeArr.length;

		let _maxValue = 100;
		this._maxValue = _maxValue;
		this._singleValue = _maxValue / 5;

		this._minTime = _timeArr;

		this.addLegend();
		this.addframe();
		this.addPolyLine();
		//		this.addEffect();
		this.hasRender = true;
	}
	addLegend() {
		const _this = this;
		let circleX, circleY;
		this._config.nameField.map(function(value, index) {
			let titleListGroup = new Group();
			_this.radialColorList = [{
				offset: 0,
				color: 'rgba(255,255,255,0.9)'
			}, {
				offset: 0.3,
				color: " rgba(255,255,255,0.9)"
			}, {
				offset: 0.31,
				color: _this.colorlist[index].replace("1)", "0.5)")
			}, {
				offset: 0.7,
				color: _this.colorlist[index].replace("1)", "0)")
			}, {
				offset: 1,
				color: " rgba(255,255,255,0)"
			}];
			_this.radialColorTitleList = [{
				offset: 0,
				color: 'rgba(0,0,0,0)'
			}, {
				offset: 0.3,
				color: ' rgba(0,0,0,0)'
			}, {
				offset: 1,
				color: _this.colorlist[index].replace("1)", "0.5)")
			}];


			_this.checkedColor = [{
				offset: 0,
				color: 'rgba(0,0,0,0.9)'
			}, {
				offset: 0.44,
				color: 'rgba(255,252,0,1)'
			}, {
				offset: 0.45,
				color: 'rgba(255,252,0,1)'
			}, {
				offset: 0.55,
				color: 'rgba(0,162,227,0.1)'
			}, {
				offset: 0.7,
				color: 'rgba(40,205,227,0.1)'
			}, {
				offset: 1,
				color: 'rgba(255,252,0,1)'
			}];
			_this["radial" + index] = new RadialGradient(0.5, 0.5, 0.5, _this.radialColorList, false);
			_this["radialTitle" + index] = new RadialGradient(0.5, 0.5, 0.5, _this.radialColorTitleList, false);
			_this.checkedRadialColor = new RadialGradient(0.5, 0.5, 0.5, _this.checkedColor, false);

			let colorStr1 = _this.colorlist[index].replace("1)", "0.6)");
			let colorStr2 = _this.colorlist[index].replace("1)", "0)");
			_this["linearColorList" + index] = [{
				offset: 0,
				color: colorStr1
			}, {
				offset: 0.9,
				color: colorStr2
			}];
			_this["linear" + index] = new LinearGradient(0.5, 0, 0.5, 1, _this["linearColorList" + index], false);

			circleX = _this.width * 0.4;
			circleY = 25;
			if (index >= 4) {
				circleX = _this["legendCircleA" + (index - 4)].shape.cx;
				circleY = 75;
			}


			_this["legendLine" + index] = new Line({
				type: "line",
				shape: {
					x1: 0,
					y1: 0,
					x2: 16,
					y2: 0
				},
				style: {
					stroke: _this.colorlist[index].replace("1)", "0.7)"),
					lineWidth: 1
				},
				zlevel: 2
			});
			titleListGroup.add(_this["legendLine" + index])
			_this["legendLine" + index].saveColor = _this.colorlist[index].replace("1)", "0.7)");

			_this["legendCircle" + index] = new Circle({
				type: "circle",
				shape: {
					cx: 8,
					cy: 0,
					r: 3
				},
				style: {
					fill: _this.colorlist[index],
					stroke: null
				},
				zlevel: 2

			})
			titleListGroup.add(_this["legendCircle" + index])
			_this["legendCircle" + index].saveColor = _this["legendCircle" + index].style.fill;

			_this["legendText" + index] = new Text({
				type: "line",
				style: {
					text: _this._config.nameField[index],
					x: 22,
					y: 0,
					fill: "#50a7bd",
					font: "11px DIN MEDIUM",
					textVerticalAlign: "middle",
					textAlign: "left",
				}
			});
			if (index == 0) {
				_this.firstwordBeginPos = (_this.width - _this["legendText" + index].getBoundingRect().width - _this["legendText" + index].style.x) / 2-50;
			}
			titleListGroup.position = [_this.firstwordBeginPos + index * 80, circleY];
			titleListGroup.add(_this["legendText" + index])
			_this.zr.add(titleListGroup);
			titleListGroup.nameIndex = index;
			titleListGroup.hasShow = true;
			titleListGroup.saveColor = _this["legendText" + index].style.fill;
			//添加点击事件
			_this.notClick = false;
			titleListGroup.on("click", function() {
				return;
				if (_this.notClick) return;
				_this.notClick = true;
				//				this.nameIndex
				if (this.hasShow) {

					_this["groupClipPath_" + this.nameIndex].animateShape().when(500, {
						width: 0
					}).start();


					for (let i = 0; i < _this._length; i++) {
						_this["valueCircle" + this.nameIndex + "_" + (_this._length - i - 1)].animateShape().when(500, {
							r: 0
						}).delay(50 + 100 * i).start().done(function() {
							if (i == _this._length - 1) {
								_this.notClick = false;
							}
						});
						_this["valuePolygon" + this.nameIndex + "_" + (_this._length - i - 1)].animateStyle().when(300, {
							opacity: 0
						}).delay(50 + 100 * i).start();

						_this["valuePolygon" + this.nameIndex + "_" + (_this._length - i - 1)].animate().when(300, {
							position: [0, 40]
						}).delay(50 + 120 * i).start();
					}
					_this["legendCircle" + this.nameIndex].style.fill = "rgba(195,195,195,0.3)";
					_this["legendLine" + this.nameIndex].style.stroke = "rgba(195,195,195,0.3)";
					_this["legendText" + this.nameIndex].style.fill = "rgba(195,195,195,0.3)";

					this.hasShow = false;
				} else {
					for (let i = 0; i < _this._length; i++) {
						_this["valueCircle" + this.nameIndex + "_" + i].animateShape().when(500, {
							r: 10
						}).delay(50 + 100 * i).start().done(function() {
							if (i == _this._length - 1) {
								_this.notClick = false;
							}
						});
						_this["valuePolygon" + this.nameIndex + "_" + i].animateStyle().when(500, {
							opacity: 1
						}).delay(50 + 100 * i).start();
						_this["valuePolygon" + this.nameIndex + "_" + i].animate().when(300, {
							position: [0, 0]
						}).delay(50 + 80 * i).start("backOut");
					}
					_this["groupClipPath_" + this.nameIndex].animateShape().when(500, {
						width: _this.width
					}).start();
					_this["legendCircle" + this.nameIndex].style.fill = _this["legendCircle" + this.nameIndex].saveColor;
					_this["legendLine" + index].style.stroke = _this["legendLine" + index].saveColor;
					_this["legendText" + index].style.fill = this.saveColor;
					this.hasShow = true;
				}
			})

		})

	}
	addframe() {
		const _this = this;
		const topX = 70;
		const topY = 40;
		const originX = 70;
		const originY = 310;
		const rightX = 444;
		const rightY = 310;
		const singleY = (originY - topY) / 5.5;
		const singleX = (rightX - originX) / this._length;
		const alertBoxWidth = 200;
		this._originX = originX;
		this._originY = originY;
		this._rightX = rightX;
		this._rightY = rightY;
		this._singleX = singleX;
		this._singleY = singleY;
		this._alertBoxWidth = alertBoxWidth;
		_this.axisY = new Line({
			type: "line",
			shape: {
				x1: topX,
				y1: topY + 10,
				x2: originX,
				y2: originY
			},
			style: {
				stroke: "#00dcff",
				lineWidth: 1
			}
		})
		this.zr.add(_this.axisY);
		_this.axisX = new Line({
			type: "line",
			shape: {
				x1: originX,
				y1: originY,
				x2: rightX,
				y2: rightY
			},
			style: {
				stroke: "#00dcff",
				lineWidth: 1
			}
		})
		this.zr.add(_this.axisX);

		_this.classifier = new Text({
			type: 'text',
			style: {
				text: "（%）",
				x: topX - 12,
				y: topY,
				fill: "#50a7bd",
				font: "12px DIN MEDIUM",
				textVerticalAlign: "middle",
				textAlign: "right",
			}
		})
		this.zr.add(_this.classifier);



		_this["rectAxisXTextBar"] = new Group();
		let rectArea = new Rect({
			shape: {
				x: topX,
				y: topY + 22,
				width: rightX - originX,
				height: singleY * 5
			}
		});
		_this["rectAxisXTextBar"].setClipPath(rectArea);


		_this.zr.add(_this["rectAxisXTextBar"])
		for (let i = 0; i < 6; i++) {
			_this["pointAxisY" + i] = new Rect({
				type: "rect",
				shape: {
					r: 0,
					x: topX - 3,
					y: topY + (i + 0.5) * singleY - 1,
					width: 3,
					height: 3
				},
				style: {
					fill: "#cee1ff"
				}
			})
			this.zr.add(_this["pointAxisY" + i]);

			_this["textAxisY" + i] = new Text({
				type: "text",
				style: {
					text: this._maxValue - this._singleValue * i,
					x: topX - 20,
					y: topY + (i + 0.5) * singleY - 1,
					fill: "#50a7bd",
					font: "14px DIN MEDIUM",
					textVerticalAlign: "middle",
					textAlign: "right",
				}
			})
			this.zr.add(_this["textAxisY" + i]);

			_this["bgLine" + i] = new Line({
				type: "line",
				shape: {
					x1: topX,
					y1: topY + (i + 0.5) * singleY,
					x2: rightX,
					y2: topY + (i + 0.5) * singleY
				},
				style: {
					stroke: "rgba(5,62,81,0.8)",
					lineWidth: 1
				}
			})
			this.zr.add(_this["bgLine" + i]);

		}
		for (let i = 0; i < this._length; i++) {
			_this["pointAxisX" + i] = new Rect({
				type: "rect",
				shape: {
					r: 0,
					x: originX + (0.5 + i) * singleX - 1,
					y: originY,
					width: 3,
					height: 3
				},
				style: {
					fill: "#cee1ff"
				}
			})


			_this["lineAxisX" + i] = new Line({
				type: "line",
				shape: {
					x1: originX + (0.5 + i) * singleX,
					y1: originY,
					x2: originX + (0.5 + i) * singleX,
					y2: topY + 25
				},
				style: {
					stroke: "rgba(7,102,130,0.8)",
					lineWidth: 1,
					lineDashOffset: 2,
					lineDash: [3, 3]
				}
			})
			_this["lineAxisX" + i].saveStroke = "rgba(7,102,130,0.8)";
			this.zr.add(_this["lineAxisX" + i]);



			let lineGradient = [{
				offset: 0,
				color: 'rgba(43,73,108,0.1)'
			}, {
				offset: 1,
				color: 'rgba(43,73,108,0.1)'
			}];
			let fillColor = new LinearGradient(0, 0, 0, 1, lineGradient, false);
			let lineGradient1 = [{
				offset: 0,
				color: 'rgba(43,73,108,0.2)'
			}, {
				offset: 1,
				color: 'rgba(43,73,108,0)'
			}];
			let fillColor1 = new LinearGradient(0, 0, 0, 1, lineGradient1, false);

			_this["rectAxisX" + i] = new Rect({
				type: "rect",
				shape: {
					r: 0,
					x: originX + (0.1 + i) * singleX,
					y: topY + 0.5 * singleY,
					width: 0.8 * singleX,
					height: singleY * 5
				},
				style: {
					fill: fillColor
				}
			})
			_this["rectAxisXText" + i] = new Rect({
				type: "rect",
				shape: {
					r: 0,
					x: originX + (0.1 + i) * singleX,
					y: topY + 0.5 * singleY,
					width: 0.8 * singleX,
					height: singleY * 5
				},
				style: {
					fill: fillColor1
				}
			});
			_this["rectAxisXTextBar"].add(_this["rectAxisXText" + i]);

			this.zr.add(_this["rectAxisX" + i]);
			this.zr.add(_this["rectAxisXText" + i]);
			this.zr.add(_this["pointAxisX" + i]);

			_this["textAxisX" + i] = new Text({
				type: "text",
				style: {
					text: this._minTime[i],
					x: originX + (0.5 + i) * singleX,
					y: originY + 12,
					fill: "#50a7bd",
					font: "12px DIN MEDIUM",
					textVerticalAlign: "middle",
					textAlign: "center",
				}
			})
			this.zr.add(_this["textAxisX" + i]);

		}

		for (let i = 0; i < this._length; i++) {
			let yValue = topY + 0.5 * singleY - singleY * 5;
			let curObj = _this["rectAxisXText" + i];

			this.callBackSelf(curObj, yValue);
		}
	}
	callBackSelf(curObj, yValue) {
		const _this = this;
		let delay = Math.random() * 2000 + 500;
		let during = Math.random() * 4000 + 3000;
		curObj.animateShape().when(during, {
			y: yValue
		}).start().delay(delay).done(function() {
			curObj.shape.y = curObj.shape.y - 3.2 * yValue;
			_this.callBackSelf(curObj, yValue);
		});
	}
	addPolyLine() {
		const _this = this;
		const names = this._config.nameField;
		const groupAnimateBegin = new Group();
		_this.zr.add(groupAnimateBegin);


		let pos2Arr = [];
		for (let i = 0; i < names.length; i++) {
			this["groupChildren_" + i] = new Group();
			groupAnimateBegin.add(this["groupChildren_" + i])
			this["group" + i] = new Group();
			this["_positionArr" + i] = [];
			let pArr = [];
			pos2Arr.push(pArr);
			this._dataProvider[i][_this._config["dataList"]].map(function(value, index) {
				//				value[names[i]]
				//index是时间序号
				let cx = _this["textAxisX" + index].style.x;
				let cy = _this._originY - value[_this._config['value']] / _this._singleValue * _this._singleY;
				let curValue = value[_this._config['value']] + "%";
				let position = [];
				position.push(cx);
				position.push(cy);
				pArr.push([cx,cy]);
				_this["_positionArr" + i].push(position);


				_this["valueCircle" + i + "_" + index] = new Isogon({
					type: "isogon",
					shape: {
						x: cx,
						y: cy,
						r: 0,
						n: 6
					},
					style: {
						fill: _this["radial" + i],
						stroke: _this.colorlist[i],
						lineWidth: 2,
						shadowColor: _this.colorlist[i],
						shadowBlur: 6,
					},
					zlevel: 2
				});
				_this["valueCircle" + i + "_" + index].saveIndex = index;
				_this.zr.add(_this["valueCircle" + i + "_" + index]);


				_this["valueCircle" + i + "_" + index].on("mouseover", function() {
					let curIndexValue = this.saveIndex; //saveStroke
					_this["lineAxisX" + curIndexValue].style.stroke = "#fff";
					_this["lineAxisX" + curIndexValue].dirty();
				})
				_this["valueCircle" + i + "_" + index].on("mouseout", function() {
					let curIndexValue = this.saveIndex; //saveStroke
					_this["lineAxisX" + curIndexValue].style.stroke = _this["lineAxisX" + curIndexValue].saveStroke;
					_this["lineAxisX" + curIndexValue].dirty();
				})

				let polyLinePoints = [
					[cx, cy - 12],
					[cx + 2, cy - 16],
					[cx + 18, cy - 16],
					[cx + 18, cy - 30],
					[cx - 18, cy - 30],
					[cx - 18, cy - 16],
					[cx - 2, cy - 16],
					[cx, cy - 12]
				];

				let positions = [0, 40];
				let textOffsets = [0, -3];
				let lastArray = [];
				if (i > 0) {
					let lastCyValue = _this._dataProvider[i - 1][_this._config["dataList"]][index][_this._config['value']];
					let lastCy = _this._originY - lastCyValue / _this._singleValue * _this._singleY;
					if (lastCy - cy > 65 || cy - lastCy > 65) {

					} else if (cy >= lastCy && cy - lastCy < 65) {
						//朝下
						for (let j = 0; j < polyLinePoints.length; j++) {
							polyLinePoints[j][1] = cy + (cy - polyLinePoints[j][1]);
						}
						textOffsets = [0, 0];
					} else if (cy < lastCy && lastCy - cy < 65) {
						//朝下
						for (let j = 0; j < polyLinePoints.length; j++) {
							lastArray.push([polyLinePoints[j][0], cy + (cy - polyLinePoints[j][1]) + lastCy - cy]);
						}
						_this["valuePolygon" + (i - 1) + "_" + index].shape.points = lastArray;
						_this["valuePolygon" + (i - 1) + "_" + index].style.textOffset = [0, 0];
						//_this["valuePolygon" + (i - 1) + "_" + index].dirty();
					}
				}
				_this["valuePolygon" + i + "_" + index] = new Polygon({
					type: "polygon",
					position: positions,
					shape: {
						points: polyLinePoints,
						smooth: false,
						smoothConstraint: null
					},
					style: {
						fill: _this.colorlistAlert[i],
						stroke: null,
						text: curValue,
						textAlign: "center",
						font: "14px DIN MEDIUM",
						textVerticalAlign: "middle",
						textOffset: textOffsets,
						opacity: 0
					},
					zlevel: 2
				});


				_this.zr.add(_this["valuePolygon" + i + "_" + index]);

				_this["valueCircle" + i + "_" + index].animateShape().when(500, {
					r: 10
				}).delay(50 + 100 * index).start();
				_this["valuePolygon" + i + "_" + index].animateStyle().when(500, {
					opacity: 1
				}).delay(50 + 100 * index).start();
				_this["valuePolygon" + i + "_" + index].animate().when(400, {
					position: [0, 0]
				}).delay(50 + 120 * index).start("backOut");


				_this["group" + i].add(_this["valueCircle" + i + "_" + index]);
				_this["valueCircle" + i + "_" + index].saveColor = _this["valueCircle" + i + "_" + index].style.fill;
				_this["valueCircle" + i + "_" + index].nameIndex = i;
				_this["valueCircle" + i + "_" + index].timeIndex = index;
				//			添加鼠标进入效果

			})

			let lastY = this["valueCircle" + i + "_" + (this._length - 1)].shape.cy - (this["valueCircle" + i + "_" + (this._length - 2)].shape.cy - this["valueCircle" + i + "_" + (this._length - 1)].shape.cy) / 2
			if (lastY > this._rightY) {
				lastY = this._rightY;
			}
			this["polyShape" + i] = new Polyline({
				type: "polyline",
				shape: {
					points: this["_positionArr" + i],

					smooth: false,

					smoothConstraint: null
				},

				style: {
					stroke: this.colorlist[i],
					lineWidth: 2,
					fill: null,
					shadowColor: "rgba(0,0,0,0.7)",
					shadowOffsetY: 4,
					shadowBlur: 6,
					opacity: 1
				},
				zlevel: 0
			})
			this["groupChildren_" + i].add(this["polyShape" + i])

		}
		for (var i = 0; i < pos2Arr[0].length; i++) {
			lineLight({
				zr:_this.zr,
				x:pos2Arr[0][i][0],
				y:pos2Arr[0][i][1],
				tX:pos2Arr[1][i][0],
				tY:pos2Arr[1][i][1],
				during:2000,
				delay:1000,
				param:_this["valueCircle1_" + i],
				perFn:function(param){
					param.style.stroke = 'rgba(255,255,255,1)';
					param.animateStyle().when(2000,{
						stroke:'rgba(0,250,255,1)'
					}).delay(2000).start();
				}
			});
		}
		for (let i = 0; i < names.length; i++) {
			let curGroup, shape, clipPath;
			curGroup = this["groupChildren_" + i];
			shape = {
				width: _this.width,
				height: _this.height
			}
			this["groupClipPath_" + i] = new Rect({
				shape: {
					x: 0,
					y: 0,
					width: 0,
					height: _this.height
				}
			});
			curGroup.setClipPath(this["groupClipPath_" + i]);
			this["groupClipPath_" + i].animateShape().when(2000, {
				width: _this.width
			}).delay(100).start();
		}

	}
}
module.exports = ZnfwXfl;