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
        T.map.map.on('zoomend', (e) => {
            this.setState({})
        })
    }
    /**
     * 
     */
    getScale() {
        let z = T.map.getZoom(),
            minZoom = T.map.getMinZoom();
        return (z - minZoom) / this.getNum();
    }
    /**
     * 
     */
    getNum() {
        let minZoom = T.map.getMinZoom(),
            maxZoom = T.map.getMaxZoom();
        return maxZoom - minZoom + 1
    }
    /**
     * 
     */
    componentDidMount() {
        this.updateGraphics();
    }

    shouldComponentUpdate() {
        this.updateGraphics();
        return true;
    }

    updateGraphics() {
        let { refs } = this,
            { zoomScale } = refs;
        if (zoomScale) {
            let { width, height } = zoomScale,
                scale = this.getScale(),
                ctx = zoomScale.getContext('2d');
            ctx.clearRect(0, 0, width, height)
           
            ctx.shadowColor = "#222";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 2;
            ctx.strokeStyle = '#111'
            let cx = 8, cy = 0, my = 100 ;
            ctx.beginPath();
            ctx.moveTo(cx += 5, cy)
            ctx.lineTo(cx, my)
            ctx.lineTo(cx -= 5, my)
            ctx.lineTo(cx, cy)
            ctx.fillStyle = "#FFF"
            ctx.fill()
            //
            cy = 100 * scale
            my = 100;
            ctx.beginPath()
            ctx.moveTo(cx += 5, cy)
            ctx.lineTo(cx, my)
            ctx.lineTo(cx -= 5, my)
            ctx.lineTo(cx, cy)
            ctx.fillStyle = "rgba(60,110,225,0.4)"
            ctx.fill()
            //
            ctx.strokeStyle = 'rgba(66,66,66,0.3)'
            ctx.lineWidth = 0.4;
            ctx.beginPath()
            let l = this.getNum();
            cy = 100/l;
            for(let i=1,s=cy;i<l;i++){
                ctx.moveTo(9, cy)
                ctx.lineTo(14, cy)
                cy+=s;
            }
            ctx.stroke()
            ctx.closePath()
        }
    }
    /**
     * 
     * @param {*} e 
     */
    onSliderClick(e) {
        let zoom = Math.ceil((e.clientY - 140) / 100 * this.getNum() + T.map.getMinZoom())
        T.map.setZoom(zoom)
    }

    zoomIn() {
        T.map.zoomBy(1)
    }

    zoomOut() {
        T.map.zoomBy(-1)
    }

    onChange() {

    }

    setZoom() {
        T.map.setZoom()
    }

    render() {
        let pos = this.getScale() * 100 + 16;
        return (
            <div className="ZoomControl" >
                <i className='tf tf-plus' onClick={this.zoomIn.bind(this)} />
                <canvas ref='zoomScale' width={20} height={100} onClick={this.onSliderClick.bind(this)} />
                <i className='tf tf-minus' onClick={this.zoomOut.bind(this)} />
                <i ref="zoomSlider" className='tf tf-minus' style={{ padding: '0px 4px', position: 'absolute', top: pos, left: 0 }} />
            </div>
        )
    }
}