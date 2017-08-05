/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class ZoomControl extends Component {
    constructor(props) {
        super(props);
        if (!T.map) {
            T.on('tmap-load', e => {
                T.map.map.on('zoomend', (e) => {
                    this.setState({})
                })
            })
        } else {
            T.map.map.on('zoomend', (e) => {
                this.setState({})
            })
        }

    }
    /**
     * 获取当前scale
     */
    getScale(z) {
        z = z || T.map.getZoom();
        let minZoom = T.map.getMinZoom();
        return (z - minZoom) / this.getNum();
    }
    /**
     * 获取地图级别范围数
     */
    getNum() {
        let minZoom = T.map.getMinZoom(),
            maxZoom = T.map.getMaxZoom();
        return maxZoom - minZoom + 1
    }
    /**
     * 挂载之后
     */
    componentDidMount() {
        this.updateGraphics();
    }
    /**
     * 是否要update
     */
    shouldComponentUpdate() {
        this.updateGraphics();
        return true;
    }
    /**
     * 绘制图形
     */
    updateGraphics() {
        let { refs } = this,
            { zoomScale } = refs;
        if (zoomScale) {
            let { width, height } = zoomScale,
                scale = this.getScale(),
                ctx = zoomScale.getContext('2d');
            ctx.clearRect(0, 0, width, height)
            //
            ctx.shadowColor = '#222';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 2;
            ctx.strokeStyle = '#111'
            let cx = 7, cy = 0, my = 100;
            ctx.beginPath();
            ctx.moveTo(cx += 5, cy)
            ctx.lineTo(cx, my)
            ctx.lineTo(cx -= 5, my)
            ctx.lineTo(cx, cy)
            ctx.fillStyle = '#FFF'
            ctx.fill()
            //
            cy = 100 * scale
            my = 100;
            ctx.beginPath()
            ctx.moveTo(cx += 5, cy)
            ctx.lineTo(cx, my)
            ctx.lineTo(cx -= 5, my)
            ctx.lineTo(cx, cy)
            ctx.fillStyle = 'rgba(60,110,225,0.5)'
            ctx.fill()
            //
            ctx.strokeStyle = 'rgba(77,77,77,0.6)'
            ctx.lineWidth = 0.4;
            ctx.beginPath()
            let l = this.getNum();
            cy = 100 / l;
            for (let i = 1, s = cy; i < l; i++) {
                ctx.moveTo(7, cy)
                ctx.lineTo(12, cy)
                cy += s;
            }
            ctx.stroke()
            ctx.closePath()
        }
    }
    /**
     * zoomIn
     */
    zoomIn() {
        T.map.zoomBy(1)
    }
    /**
     * zoomOut
     */
    zoomOut() {
        T.map.zoomBy(-1)
    }
    /**
     * 街市省国
     */
    drawText(show) {
        let { zoomText, zoomScale } = this.refs,
            { width, height } = zoomText,
            ctx = zoomText.getContext('2d'),
            draw = (s, text) => {
                let r = 8,
                    y = this.getScale(s) * 100;
                ctx.beginPath();
                ctx.fillStyle = 'rgba(136,184,255,0.8)'
                ctx.strokeStyle = '#EEE'//'#5E8BEA'
                ctx.lineWidth = 1;
                ctx.moveTo(0, y);
                ctx.lineTo(r, y - r);
                ctx.lineTo(28, y - r);
                ctx.lineTo(28, y + r);
                ctx.lineTo(r, y + r);
                ctx.lineTo(0, y);

                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.fillStyle = '#FFF'
                ctx.fillText(text, r + 2, y + 5);
            }
        ctx.clearRect(0, 0, width, height);
        if (show) {
            draw(3, '国');
            draw(7, '省');
            draw(12, '市');
            draw(16, '街');
        }
    }
    /**
     * 滑块点击
     * @param {*} e 
     */
    onSliderClick(e) {
        let { nativeEvent } = e,
            { offsetY } = nativeEvent,
            zoom = Math.ceil(offsetY / 100 * this.getNum() + T.map.getMinZoom())
        T.map.setZoom(zoom)
    }
    /**
     * 
     * @param {*} e 
     */
    onTextClick(e) {
        let { nativeEvent } = e,
            { offsetY } = nativeEvent,
            zoom = Math.ceil(offsetY / 100 * this.getNum() + T.map.getMinZoom())
        if (Math.abs(zoom - 4) <= 2) {
            zoom = 4
        } else if (Math.abs(zoom - 8) <= 2) {
            zoom = 8
        } else if (Math.abs(zoom - 13) <= 2) {
            zoom = 13
        } else {
            zoom = 17
        }
        T.map.setZoom(zoom)
    }
    /**
     * 
     */
    onMouseOver(e) {
        this.drawText(e.type === 'mouseover');
    }
    /**
     * 
     */
    render() {
        let pos = this.getScale() * 100 + 16;
        return (
            <div className='ZoomControl' role='button' onMouseOver={this.onMouseOver.bind(this)} onMouseOut={this.onMouseOver.bind(this)} >
                <i className='tf tf-plus' onClick={this.zoomOut.bind(this)} />
                <canvas ref='zoomScale' width='20' height='100' onClick={this.onSliderClick.bind(this)} />
                <i className='tf tf-minus' onClick={this.zoomIn.bind(this)} />
                <i ref='zoomSlider' className='tf tf-minus' style={{ padding: '0px 3px', position: 'absolute', top: pos, left: 0 }} />
                <canvas ref='zoomText' width='32' height='100' onClick={this.onTextClick.bind(this)} style={{ position: 'absolute', top: 30, left: 20 }} />
            </div>
        )
    }
}