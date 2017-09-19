const zrender = require('zrender');
const LineShape = require("zrender/lib/graphic/shape/Line.js");
const TextShape = require("zrender/lib/graphic/Text.js");
const ImageShape = require("zrender/lib/graphic/Image.js");
const SectorShape = require("zrender/lib/graphic/shape/Sector.js");
const RectShape = require("zrender/lib/graphic/shape/Rect.js");
const groupShape = require("zrender/lib/container/Group");
class ZnfwHsbl {
    constructor(dom) {
        this.$dom = $(dom);
        this.zr = zrender.init(dom);
        this.pattern = null;
        this.init();
    }

    init() {
        let _this = this;
        this.center = [0.5, 0.56];
        this.W = this.$dom.width();
        this.H = this.$dom.height();
        this.R = this.H * 0.3;
        this.vec2 = {
            x: this.W * this.center[0],
            y: this.H * this.center[1]
        };
        let imgSrc = require("../../imgs/p1/hsbl.png");
        let img = new ImageShape({
            style: {
                x: this.vec2.x - 63,
                y: this.vec2.y - 63,
                image: imgSrc,
                width: 126,
                height: 126
            }
        });

        _this.zr.add(img);

    }

    setConfig(value) {
        this._config = value;
    }

    setDataProvider(value) {
        this._dataProvider = value;
        this.creationContent();
    }

    creationContent() {
        let _this = this;
        let seriesData = [];
        let data = [];
        for (let i = 0; i < this._dataProvider.length; i++) {
            let item = this._dataProvider[i];
            seriesData.push(item.seriesName);
            data.push(item.value);
        }

        // 图例
        let text1 = new TextShape({
            style: {
                x: 169,
                y: 60,
                text: seriesData[0],
                fill: '#50a7bd'
            }
        })
        let text1Rect = new RectShape({
            shape: {
                x: 145,
                y: 52,
                width: 15,
                height: 6
            },
            style: {
                fill: '#7eb2e6'
            }
        })

        this.zr.add(text1);
        this.zr.add(text1Rect);
        let text2 = new TextShape({
            style: {
                x: 264,
                y: 60,
                text: seriesData[1],
                fill: '#50a7bd'
            }
        })
        let text2Rect = new RectShape({
            shape: {
                x: 244,
                y: 52,
                width: 15,
                height: 6
            },
            style: {
                fill: '#00dcff'
            }
        })
        this.zr.add(text2);
        this.zr.add(text2Rect);

        //  s1circle bg
        this.drawSector({
            r0: 75,
            r: 75 + 6,
            startAngle: 0,
            endAngle: Math.PI * 2,
            fill: 'rgba(126,178,230,0.2)'
        })
        //  s2circle bg
        this.drawSector({
            r0: 75 + 12,
            r: 75 + 6 + 12,
            startAngle: 0,
            endAngle: Math.PI * 2,
            fill: 'rgba(102,255,255,0.2)'
        })
        //  s1circle
        this.drawSector({
            r0: 75,
            r: 75 + 6,
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 2 * data[0] / 100 - Math.PI / 2,
            fill: '#7eb2e6',
            shadowBlur: 10,
            shadowColor: '#7eb2e6',
            animation:true,
            complete:function(){
                _this.drawSeries(75, data[0],function(){
                    //  s2circle
                    _this.drawSector({
                        r0: 75 + 12,
                        r: 75 + 6 + 12,
                        startAngle: -Math.PI / 2,
                        endAngle: Math.PI * 2 * data[1] / 100 - Math.PI / 2,
                        fill: '#66ffff',
                        shadowBlur: 10,
                        shadowColor: '#66ffff',
                        animation:true,
                        complete:function(){
                            _this.drawSeries(75 + 6 + 12, data[1]);
                        }
                    })
                });
            }
        })

        let sector5 = new SectorShape({
            shape: {
                cx: this.vec2.x,
                cy: this.vec2.y,
                r0: 75 + 12 + 6,
                r: 75 + 6 + 12 + 20,
                startAngle: 0,
                endAngle: Math.PI * 2
            },
            style: {
                fill: 'rgba(60,147,214,0.1)'
            }
        });
        this.zr.add(sector5);

        let group = new groupShape()
        for (let i = 0; i < 200; i++) {
            let reg = Math.PI * 2 / 200 * i;
            let line = new LineShape({
                shape: {
                    x1: (75 + 6 + 12 + 20 + 3) * Math.cos(reg) + this.vec2.x,
                    y1: (75 + 6 + 12 + 20 + 3) * Math.sin(reg) + this.vec2.y,
                    x2: (75 + 6 + 12 + 20 + 3 + (i % 5 == 0 ? 8 : 4)) * Math.cos(reg) + this.vec2.x,
                    y2: (75 + 6 + 12 + 20 + 3 + (i % 5 == 0 ? 8 : 4)) * Math.sin(reg) + this.vec2.y,
                },
                style: {
                    stroke: '#00dcff'
                }
            })
            group.add(line);
        }
        this.zr.add(group);
        group.origin = [this.vec2.x,this.vec2.y],
        group.animate('',true).when(15000, { rotation: Math.PI * 2 }).start();

    }

    drawSector(opts){
        opts.startAngle = opts.startAngle===undefined?-Math.PI / 2:opts.startAngle;
        let _this = this;
        let sector = new SectorShape({
            shape: {
                cx: this.vec2.x,
                cy: this.vec2.y,
                r0: opts.r0,
                r: opts.r,
                startAngle: opts.startAngle,
                endAngle: opts.endAngle
            },
            style: {
                fill: opts.fill,
                shadowBlur: opts.blur || 0,
                shadowColor: opts.shadowColor || 'rgba(0,0,0,0)'
            }
        });
        if (opts.animation) {
            sector.shape.endAngle = opts.startAngle;
            sector.animateShape().when(1000,{endAngle:opts.endAngle}).start().done(function(){
                opts.complete && opts.complete();
            })
        }
        _this.zr.add(sector);
        return sector;
    }

    drawSeries(r, num,complete) {
        let _this = this;
        let s2Line1 = new LineShape({
            shape: {
                x1: r * Math.cos(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.x,
                y1: r * Math.sin(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.y,
                x2: 133 * Math.cos(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.x,
                y2: 133 * Math.sin(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.y,
                percent:0
            },
            style: {
                stroke: '#52a4f6',
                lineDash: [2, 2]
            }
        })
        this.zr.add(s2Line1);

        let s2Line2 = new LineShape({
            shape: {
                x1: 133 * Math.cos(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.x,
                y1: 133 * Math.sin(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.y,
                x2: 133 * Math.cos(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.x + (num >= 50 ? -30 : 30),
                y2: 133 * Math.sin(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.y,
                percent:0
            },
            style: {
                stroke: '#52a4f6',
                lineDash: [2, 2]
            }
        })
        this.zr.add(s2Line2);

        let s2Rect = new RectShape({
            shape: {
                x: 133 * Math.cos(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.x - 2 + (num >= 50 ? -30 : 30),
                y: 133 * Math.sin(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.y - 2,
                width: 5,
                height: 5,
            },
            style: {
                fill: '#66ffff'
            }
        })
        

        let s2Text = new TextShape({
            style: {
                x: 133 * Math.cos(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.x - 2 + (num >= 50 ? -60 : 60),
                y: 133 * Math.sin(Math.PI * 2 * num / 100 - Math.PI / 2) + this.vec2.y - 2,
                text: num + '%',
                textFont: 'normal 20px DIN MEDIUM',
                textAlign: 'center',
                textVerticalAlign: 'middle',
                fill: '#fff',
                shadowBlur: 10,
                shadowColor: '#3197d9'
            }
        })
        
        s2Line1.animateShape().when(500,{percent:1}).start().done(function(){
            s2Line2.animateShape().when(500,{percent:1}).start().done(function(){
                _this.zr.add(s2Rect);
                _this.zr.add(s2Text);
                complete && complete();
            })
        })
    }
}

module.exports = ZnfwHsbl;
