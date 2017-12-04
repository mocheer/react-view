/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 气泡框
 */
export default class ToolTip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placement: props.placement,
            label: props.label
        }
    }
    render() {
        let { state } = this,
            { target, label, offset, hide } = state;
        if (hide || !label || !target) {
            state.hide = false;
            return null;
        }

        let placement = state.placement || 'left',
            className = classNames('tooltip', 'fade', placement, 'in'),
            rect = target.getBoundingClientRect(),
            style = {};
        //
        switch (placement) {
            case "top":
                style.left = rect.left
                style.top = rect.top
                break
            case "bottom":
                style.left = rect.left
                style.top = rect.top + rect.height
                break
            case "right":
                style.left = rect.left + width
                style.top = rect.top
                break
            case "left":
                style.right = document.body.clientWidth - rect.left
                style.top = rect.top
                break;
        }
        if (offset && offset.length > 0) {
            style.left += offset[0]
            style.top += offset[1]
            offset.length = 0
        }
        Object.assign(style, state.style)
        return (
            <div className={className} style={style} role="tooltip">
                <div className="tooltip-arrow"></div>
                <div className="tooltip-inner" style={{ textAlign: 'left' }}>{label}</div>
            </div>
        );
    }
}