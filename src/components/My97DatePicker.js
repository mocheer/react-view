/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import pick from '../widgets/datePicker'
/**
 * 
 */
export default class DatePicker extends Component {
    /**
     * 渲染
     */
    render() {
        let { props } = this,
            { placeholder, format, style, value } = props;
        style = Object.assign({ display: 'inline-block' }, style)
        if (T.isDate(value)) {
            let fmt = format && format.replace(/y/g, 'Y').replace(/d/g, 'D').replace(/H/g, 'h') || 'YYYY-MM-DD hh:mm:ss'
            value = T.helper.fmt(value, fmt)
        } else {
            value = value.replace('T', ' ')
        }

        return (
            <input ref={input => {
                if (!this.input) {
                    this.input = input;
                    this.value = value;
                }
            }} type='text' placeholder={placeholder} value={value} style={style} className="form-control Wdate" onClick={e => {
                pick({
                    el: e.nativeEvent.target,
                    dateFmt: format,
                    start: value,
                    onpicked: e => {
                        this.value = props.value = this.input.value;
                    }
                })
            }} />
        );
    }
}