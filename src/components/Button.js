/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 
 */
export default class Button extends Component {
    /**
     * 渲染
     */
    render() {
        let { props } = this,
            { type, label, children, style, onClick } = props;
        type = type || 'default';
        return <button onClick={onClick} className={'btn btn-' + type} style={style} type="submit">{label || children}</button>
    }
}