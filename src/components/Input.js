/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
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
     * 
     * @param {*} e 
     */
    handleChange(e) {
        let { target } = e,
            { value } = target;
        this.value = value;
    }
    /**
     * 渲染
     */
    render() {
        let { props } = this,
            { placeholder, className, readOnly, maxLength, style, value } = props;
        className = className || 'form-control';
        return <input ref={input => {
            if (!this.input) {
                this.input = input
                this.value = value;
            }
        }} type="text" style={style} className={className} placeholder={placeholder} value={value} onChange={this.handleChange.bind(this)} />
    }
}
/**
 * 
 */
Input.defaultProps = {
    autoSize: false //是否根据文字内容自动改变输入框大小，常用于word编辑
}