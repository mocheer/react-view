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
export default class Input extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props)
    }
    /**
     * 渲染
     */
    render() {
        let { props } = this,
            { placeholder, className, readOnly, maxLength, style, value } = props;
        className = className || 'form-control';
        return <input type="text" className={className} placeholder={placeholder} value={value} />
    }
}
/**
 * 
 */
Input.defaultProps = {
    autoSize: false //是否根据文字内容自动改变输入框大小，常用于word编辑
}