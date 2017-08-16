/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import '../../style/components/Input.css'
/**
 * 
 */
export default class Input extends Component {
    render() {
        let { props } = this,
            { placeholder, className } = props;
        className = className || 'form-control';//UnderlineInput
        return <input type="text" className={className} placeholder={placeholder} />
    }
}