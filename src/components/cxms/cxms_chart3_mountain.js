var containerId;
var spaceX, spaceY;
var width, height;

var nodeArray;

var labelField, valueField;
var dataProvider, origdata;

var topSpace;

var colorArray = ['#d4422b', '#f98106', '#eb970c', '#eb970c', '#efd33b', '#fdff00', '#c8f60d', '#80f70f', '#0ff7dd', '#2cd1e4'];

var mountainChart = function(config) {
	this.EventDispatcher = $({});
	var grid = {
		left:0.05,
		right:0.05,
		top:0.15,
		bottom:0.04,
	};
	width = config.width;
	height = config.height*(1-grid.bottom);
	topSpace = config.height*grid.top;
	labelField = config.labelField;
	valueField = config.valueField;
	containerId = config.containerId;
	this.init();
}

var p = mountainChart.prototype;

p.init = function() {
	var cur = this;
	var canvas = document.createElement('canvas');
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
	document.querySelector(containerId).appendChild(canvas);
	cur.stage = new createjs.Stage(canvas);
	cur.stage.enableMouseOver(10); // 开启mouseOver。
	cur._canvas = canvas;
}

p.setDataProvider = function(data) {
	var cur = this;
	dataProvider = data;
	origdata = data;
	if (dataProvider == null || dataProvider.length <= 0) return;
	dataProvider.sort(function(a, b) {
		return b[valueField] - a[valueField];
	});

	width *= 0.7;
	spaceX = (width - 50) / (dataProvider.length * 2);
	spaceY = (height - topSpace) / dataProvider.length;
	this.createMountain();
	this.entrance();
	cur.stage.update();
}

p.createMountain = function() {
	var cur = this;
	nodeArray = [];
	var colorIndex = 0;
	for (var i = 0; i < dataProvider.length; i++) {
		var alpha = i == dataProvider.length - 1 ? 1 : i * 0.035 + 0.05;
		var color = 'rgba(0, 162, 255,' + alpha + ')';
		var lineColor = colorArray[colorIndex];

		var data = dataProvider[i];

		var nodeX = i * spaceX;
		var nodeY = topSpace + i * spaceY;
		var nodeW = width - 50 - 2 * nodeX;
		var nodeH = height - nodeY;

		var node = new createjs.Shape();
		node.data = data;
		node.x = nodeX + width * 0.2;
		node.y = nodeY;
		node.width = nodeW;
		node.height = nodeH;
		node.toY = nodeY;
		node.toH = nodeH;
		node.origdata = origdata[i];
		node.color = color;
		node.lineColor = lineColor;
		node.graphics.setStrokeStyle(1).beginStroke(node.lineColor).beginFill(node.color).moveTo(0, node.height).lineTo(node.width / 2, 0).lineTo(node.width, node.height).lineTo(0, node.height);
		cur.stage.addChild(node);

		var topCircle = new createjs.Shape();
		topCircle.x = node.x + node.width / 2;
		topCircle.y = node.y;
		topCircle.graphics.endFill();
		topCircle.alpha = 0;
		node.topCircle = topCircle;
		cur.stage.addChild(topCircle);

		// 绘制顶部的六边形
		topCircle.graphics.beginFill(lineColor).drawCircle(0, 0, 2);
		topCircle.graphics.endFill();
		var points = drawPolygon(0, 0, 5, 6);
		topCircle.graphics.setStrokeStyle(1).beginStroke(lineColor).moveTo(points[0].x, points[0].y);
		for (var j = 1; j < points.length; j++) {
			topCircle.graphics.lineTo(points[j].x, points[j].y);
		}
		topCircle.graphics.lineTo(points[0].x, points[0].y);

		// 指引线
		var rightLine = new createjs.Shape();
		rightLine.x = node.x + node.width / 2 - 2;
		rightLine.y = node.y - 8;
		rightLine.width = 0;
		rightLine.height = 10;
		rightLine.toW = width - (width - 50) / 2;
		rightLine.color = colorArray[colorIndex];
		//rightLine.graphics.setStrokeStyle(1).beginStroke('red').moveTo( 3, 8 ).lineTo( 10, 0 ).lineTo( rightLine.width, 0 );
		node.rightLine = rightLine;
		cur.stage.addChild(rightLine);

		var txt = new createjs.Text();
		var txtStr = data[labelField] + ' ' + data[valueField] + ' 元';
		if (txtStr.length > 13) {
			txtStr = txtStr.substr(0, 13);
		}
		txt.text = txtStr;
		txt._text = data[labelField];
		txt.width = txt.getBounds().width;
		txt.height = txt.getBounds().height;
		txt.x = rightLine.x + rightLine.toW - txt.width;
		txt.y = rightLine.y - 15 - 2;
		txt.alpha = 0;
		txt.color = '#66feff';
		txt.shadow = '10px #3197d9';
		node.txt = txt;
		cur.stage.addChild(txt);

		nodeArray.push(node);


		colorIndex++;
		if (colorIndex >= colorArray.length) colorIndex = 0;


		// 绑定事件
		var current = this;
		node.addEventListener('mouseover', function(event) {
			var target = event.currentTarget;

			target._alpha = target.alpha;
			target.graphics.clear();
			target.graphics.setStrokeStyle(1).beginStroke(target.lineColor).beginFill('#1ae6ff').moveTo(0, target.height).lineTo(target.width / 2, 0).lineTo(target.width, target.height).lineTo(0, target.height);
			cur.stage.update();

			var item = {
				origdata: target.origdata,
				name: target.data[labelField],
				value: target.data[valueField],
				x: event.stageX + 10,
				y: event.stageY + 10
			};
			current.EventDispatcher.trigger('WIDGET_OVER', item);
		});
		node.addEventListener('mouseout', function(event) {
			var target = event.currentTarget;
			target.graphics.clear();
			target.graphics.setStrokeStyle(1).beginStroke(target.lineColor).beginFill(target.color).moveTo(0, target.height).lineTo(target.width / 2, 0).lineTo(target.width, target.height).lineTo(0, target.height);
			cur.stage.update();

			current.EventDispatcher.trigger('WIDGET_OUT');
		});
	}
}

p.entrance = function() {
	var cur = this;
	for (var i = 0; i < nodeArray.length; i++) {
		var node = nodeArray[i];
		node.y = height;
		node.height = 0;
	}

	for (i = 0; i < nodeArray.length; i++) {
		node = nodeArray[i];
		TweenMax.to(node, 1, {
			delay: i * 0.2,
			y: node.toY,
			height: node.toH,
			onUpdateParams: [node],
			onUpdate: function(node) {
				cur.stage.update();
			},
			onCompleteParams: [node],
			onComplete: function(node) {
				TweenMax.to(node.topCircle, 0.6, {
					alpha: 1,
					onUpdate: function() {
						//stage.update();
					}
				});
				TweenMax.to(node.rightLine, 0.6, {
					width: node.rightLine.toW,
					onUpdateParams: [node.rightLine],
					onUpdate: function(rightLine) {
						rightLine.graphics.setStrokeStyle(0.5).beginStroke(rightLine.color).moveTo(5, 5).lineTo(10, 0).lineTo(rightLine.width, 0);
						//stage.update();
					}
				});
			}
		});
		TweenMax.to(node.txt, 0.6, {
			delay: 1.5 + i * 0.2,
			alpha: 1,
			onUpdate: function() {
				cur.stage.update();
			}
		});
	}
}

p.resize = function(size) {
	var cur = this;
	width = size.width;
	height = size.height;

	/*cur._canvas.setAttribute('width', width);
	cur._canvas.setAttribute('height', height);*/
	cur._canvas.width = width;
	cur._canvas.height = height;

	var paddingLeft = 20,
		paddingRight = 20;
	width = width - paddingLeft - paddingRight;

	if (dataProvider == null || dataProvider.length <= 0) return;
	spaceX = (width - 50) / (dataProvider.length * 2);
	spaceY = (height - topSpace) / dataProvider.length;
	for (var i = 0; i < nodeArray.length; i++) {
		var node = nodeArray[i];
		node.graphics.clear();
		node.rightLine.graphics.clear();

		var nodeX = i * spaceX;
		var nodeY = topSpace + i * spaceY;
		var nodeW = width - 50 - 2 * nodeX;
		var nodeH = height - nodeY;
		node.x = nodeX;
		node.y = nodeY;
		node.width = nodeW;
		node.height = nodeH;
		node.topCircle.x = node.x + node.width / 2;
		node.topCircle.y = node.y;
		node.rightLine.x = node.x + node.width / 2;
		node.rightLine.y = node.y - 10;
		node.rightLine.width = width - (width - 50) / 2;
		node.rightLine.height = 10;
		node.txt.x = node.rightLine.x + node.rightLine.width - node.txt.width - 5;
		node.txt.y = node.rightLine.y - 10;
		node.graphics.setStrokeStyle(1).beginStroke(node.lineColor).beginFill(node.color).moveTo(0, node.height).lineTo(node.width / 2, 0).lineTo(node.width, node.height).lineTo(0, node.height);
		node.rightLine.graphics.setStrokeStyle(1).beginStroke(node.rightLine.color).moveTo(5, 5).lineTo(10, 0).lineTo(node.rightLine.width, 0);
		cur.stage.update();
	}
	cur.stage.update();
}
module.exports = mountainChart;


/**
 * 绘制任意多边形。
 * @param centerX 中心点X位置。
 * @param centerY 中心点Y位置。
 * @param radius 多边形对应的外接圆的半径。
 * @param edges 多边形边的数量。
 * @returns {Array}
 */
function drawPolygon(centerX, centerY, radius, edges) {
	if (edges < 3) return null;

	// 角度转弧度
	var radian = Math.PI / 180;

	var points = [];

	edges = Math.round(edges);
	var angle = 360 / edges;
	for (var i = 0; i < edges; i++) {
		var currentA = i * angle;
		var x = centerX + radius * Math.cos(currentA * radian);
		var y = centerY + radius * Math.sin(currentA * radian);

		var point = {
			x: x,
			y: y
		};
		points.push(point);
	}

	return points;
}