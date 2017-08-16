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
        return (
            <input type='text' placeholder={placeholder} value={value} style={style} className="Wdate" onClick={e => {
                pick({ el: e.nativeEvent.target, dateFmt: format })
            }} />
        );
    }
}
