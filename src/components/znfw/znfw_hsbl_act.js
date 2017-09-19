const zrender = require('zrender');
const PolygonShape = require('zrender/lib/graphic/shape/Polygon');
const LineGradient = require("zrender/lib/graphic/LinearGradient.js");
const TextShape = require("zrender/lib/graphic/Text.js");
const RectShape = require("zrender/lib/graphic/shape/Rect.js");
const groupShape = require("zrender/lib/container/Group");

class ZnfwHsblAct {
    constructor(dom) {
        this.$dom = $(dom);
        this.zr = zrender.init(dom);
        this.init();
        this.group = new groupShape();
        this.colorLinearArr = [
            [{
                offset: 1,
                color: 'rgba(0,220,255,0.5)'
            }, {
                offset: 0,
                color: 'rgba(0,220,255,0)'
            }],
            [{
                offset: 1,
                color: 'rgba(126,178,230,0.5)'
            }, {
                offset: 0,
                color: 'rgba(126,178,230,0)'
            }],
            [{
                offset: 1,
                color: 'rgba(68,207,11,0.5)'
            }, {
                offset: 0,
                color: 'rgba(68,207,11,0)'
            }],
            [{
                offset: 1,
                color: 'rgba(50,149,247,0.5)'
            }, {
                offset: 0,
                color: 'rgba(50,149,247,0)'
            }],
            [{
                offset: 1,
                color: 'rgba(183,57,65,0.5)'
            }, {
                offset: 0,
                color: 'rgba(183,57,65,0)'
            }]
        ]
    }

    init() {

    }

    setConfig(value) {
        this._config = value;
    }

    setDataProvider(value) {
        this._dataProvider = value;
        this.creationContent();
    }

    creationContent() {

        let W = 400;
        let H = 215;

        let len = this._dataProvider.length;
        let sortArr = this._dataProvider.sort(function(b, a) {
            return a.value - b.value;
        });

        let v1Arr = [];
        let v2Arr = [];
        let v1numArr = [];
        let v2numArr = [];

        let colors = ['#00dcff','#7eb2e6','#44cf6f','#3295f7','#b73941'];


        let posx = 114;
        let posy = 60;
        let posDisX = 90;
        let posDisY = 16;
        let pos = []
        for (var i = 0; i < len; i++) {
            pos.push({
                x:posx+(i*90)%270,
                y:posy+Math.floor(i/3)*posDisY
            })
        }
        for (let i = 0; i < len; i++) {
            let item = this._dataProvider[i];
            if (i < len - 3) {
                v1Arr.push(item);
                v1numArr.push(item.value);
            } else {
                v2Arr.push(item);
                v2numArr.push(item.value);
            }

            //画图例
            let text1 = new TextShape({
                style: {
                    x: pos[i].x+23,
                    y: pos[i].y+8,
                    text: item.seriesName,
                    fill: '#50a7bd'
                }
            });
            let text1Rect = new RectShape({
                shape: {
                    x: pos[i].x,
                    y: pos[i].y,
                    width: 15,
                    height: 6
                },
                style: {
                    fill: colors[i]
                }
            });

            this.zr.add(text1);
            this.zr.add(text1Rect);
        }

        let v2Num = this.sum(v2numArr);
        if (v2Num > 35) {
            v2Num = 35;
        } else if (v2Num < 25) {
            v2Num = 25;
        }

        let v2W = W * v2Num / 100;
        let v1W = W - v2W;

        // v1 保存宽度，v2保存高度
        let v1WArr = this.getNumByScale(v1numArr, v1W);
        let v2HArr = this.getNumByScale(v2numArr, H);

        // 最小值限制  20%
        v1WArr = this.resetNum(v1WArr, 0.2);
        v2HArr = this.resetNum(v2HArr, 0.2);

        //画图
        let vec = {
            x: 40,
            y: 130
        };
        let v1Color = ['rgba(0,220,255,0.1)', 'rgba(126,178,230,0.1)'];

        let rc = new RectShape({
            shape:{
                x:vec.x,
                y:vec.y,
                width:0,
                height:215
            }
        })
        this.group.setClipPath(rc);
        this.zr.add(this.group);

        let disX = 0;
        for (var i = 0; i < v1WArr.length; i++) {
            disX += (i > 0 ? v1WArr[i - 1] : 0);
            let rect = new RectShape({
                shape: {
                    x: vec.x + disX,
                    y: vec.y,
                    width: v1WArr[i],
                    height: H
                },
                style: {
                    fill: v1Color[i],
                    lineWidth: 1,
                    stroke: '#fff'
                }
            })

            this.drawShaodw(vec.x + disX, vec.y, v1WArr[i], H, this.colorLinearArr[i]);
            this.group.add(rect);

            let text1 = new TextShape({
                style: {
                    x: vec.x + disX + 15,
                    y: vec.y + H - 15,
                    text: v1Arr[i].seriesName,
                    fill: '#fff'
                }
            });

            let text2 = new TextShape({
                style: {
                    x: vec.x + disX + 15,
                    y: vec.y + H - 30,
                    text: v1Arr[i].value + '%',
                    fill: '#fff',
                    textFont:'normal 16px DIN MEDIUM'
                }
            });

            this.group.add(text1);
            this.group.add(text2);
        }

        let v2Color = ['rgba(68,207,111,0.1)', 'rgba(50,149,247,0.1)', 'rgba(183,57,65,0.1)']
        let disY = 0;
        for (var i = 0; i < v2HArr.length; i++) {
            disY += (i > 0 ? v2HArr[i - 1] : 0);
            let rect = new RectShape({
                shape: {
                    x: vec.x + v1W,
                    y: vec.y + disY,
                    width: v2W,
                    height: v2HArr[i]
                },
                style: {
                    fill: v2Color[i],
                    lineWidth: 1,
                    stroke: '#fff'
                }
            })

            this.drawShaodw(vec.x + v1W, vec.y + disY, v2W, v2HArr[i], this.colorLinearArr[i+v1WArr.length]);
            this.group.add(rect);

            let text1 = new TextShape({
                style: {
                    x: vec.x + v1W + 15,
                    y: vec.y + disY +v2HArr[i]- 10,
                    text: v2Arr[i].seriesName,
                    fill: '#fff'
                }
            });

            let text2 = new TextShape({
                style: {
                    x: vec.x + v1W + 15,
                    y: vec.y + disY +v2HArr[i]- 25,
                    text: v2Arr[i].value + '%',
                    fill: '#fff',
                    textFont:'normal 16px Microsoft Yahei'
                }
            });
            this.group.add(text1);
            this.group.add(text2);
        }
        rc.animateShape().when(1000,{width:400}).start();
        
    }

    drawShaodw(x, y, w, h, color) {
        let shadowLen = 10;

        let topColor = new LineGradient(0, 1, 0, 0, color, false);
        let rightColor = new LineGradient(0, 0, 1, 0, color, false);
        let bottomColor = new LineGradient(0, 0, 0, 1, color, false);
        let leftColor = new LineGradient(1, 0, 0, 0, color, false);

        let top = new PolygonShape({
            shape: {
                points: [
                    [x, y],
                    [x + shadowLen, y + shadowLen],
                    [x + w - shadowLen, y + shadowLen],
                    [x + w, y]
                ]
            },
            style: {
                fill: topColor
            }
        })

        let right = new PolygonShape({
            shape: {
                points: [
                    [x + w, y],
                    [x + w - shadowLen, y + shadowLen],
                    [x + w - shadowLen, y + h - shadowLen],
                    [x + w, y + h]
                ]
            },
            style: {
                fill: rightColor
            }
        })

        let bottom = new PolygonShape({
            shape: {
                points: [
                    [x + w, y + h],
                    [x + w - shadowLen, y + h - shadowLen],
                    [x + shadowLen, y + h - shadowLen],
                    [x, y + h]
                ]
            },
            style: {
                fill: bottomColor
            }
        })

        let left = new PolygonShape({
            shape: {
                points: [
                    [x, y + h],
                    [x + shadowLen, y + h - shadowLen],
                    [x + shadowLen, y + shadowLen],
                    [x, y]
                ]
            },
            style: {
                fill: leftColor
            }
        })
        this.group.add(top)
        this.group.add(right)
        this.group.add(bottom)
        this.group.add(left);
    }

    // 计算arr的和 ，
    sum(arr) {
        let n = 0;
        for (let i = 0; i < arr.length; i++) {
            n += arr[i];
        }
        return n;
    }

    //  60 30 10   ==>     75/3*2  75/3*1 25
    resetNum(arr, n) {
        let N = this.sum(arr);
        let nLimit = Math.round(n * N);
        let nChanges = 0;
        let nOthers = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] <= nLimit) {
                arr[i] = nLimit;
                nChanges += nLimit;
            } else {
                nOthers += arr[i];
            }
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > nLimit) {
                arr[i] = Math.round(N - nChanges) * arr[i] / nOthers;
            }
        }
        return arr;
    }

    // [50,25]  300    ==> [200,100]
    getNumByScale(arr, n) {
        let N = this.sum(arr);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = Math.round(n * arr[i] / N);
        }
        return arr;
    }
}

module.exports = ZnfwHsblAct;