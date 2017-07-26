/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class PanControl extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * 
     * @param {*} e 
     */
    onMouseMove(e) {
        let { target, nativeEvent } = e,
            { offsetX, offsetY } = nativeEvent;
        if (e.type == 'mouseout') {
            target.style.borderColor = 'transparent transparent transparent transparent'
            return;
        }
        if (Math.abs(offsetX) > Math.abs(offsetY)) {//左右
            if (offsetX > 0) {
                target.style.borderColor = 'transparent #999 transparent transparent'
            } else {
                target.style.borderColor = 'transparent transparent transparent #999'
            }
        } else {//上下
            if (offsetY < 0) {
                target.style.borderColor = '#999 transparent transparent transparent'
            } else {
                target.style.borderColor = 'transparent transparent #999 transparent'
            }
        }
    }
    /**
     * 
     * @param {*} e 
     */
    onClick(e) {
        let { target, nativeEvent } = e,
            { offsetX, offsetY } = nativeEvent,
            mx = 768, my = 512
        if (Math.abs(offsetX) > Math.abs(offsetY)) {
            mx = offsetX > 0 ? mx : -mx
            T.map.map.panBy([mx, 0])
        } else {
            my = offsetY > 0 ? my : -my
            T.map.map.panBy([0, my])
        }
    }
    /**
     * 渲染
     */
    render() {
        let r = 24,
            d = r + r;
        return (
            <div style={{ position: 'absolute', top: 10, left: 5, zIndex: 998, 'border': '24px solid #FFFFFF', 'border-radius': '48px' }} >
                <div style={{
                    position: 'absolute', top: -r, left: -r, width: d, height: d,
                    'border': '1px solid #A2A2A2', 'border-radius': '24px', 'box-shadow': '5px -5px 24px #D0D0D0 inset'
                }} />
                <i className='tf tf-screen' style={{ fontSize: 30, color: '#3D6DCC', position: 'absolute', top: -15, left: -15, transform: 'rotate(45deg)' }} />
                <div style={{ position: 'absolute', top: -r, left: -r, opacity: 0.2, 'border': '24px solid', 'border-radius': '48px', borderColor: 'transparent' }}
                    onMouseMove={this.onMouseMove} onClick={this.onClick} onMouseOut={this.onMouseMove}
                />
            </div>
        )
    }
}