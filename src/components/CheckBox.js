/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 多选框/复选框
 * {label,icon,checked}
 */
export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked
        }
    }
    /**
     * 
     */
    onChange(e) {
        let { props, state } = this,
            { onChange } = props,
            checked = !state.checked;
        onChange()
        this.setState({
            checked: checked
        })
    }
    /**
     * 渲染
     */
    render() {
        let { props, state } = this,
            { checked } = state,
            { label, style, icon } = props;
        if (icon) {
            icon = <img src={icon} style={{ width: 16, height: 16, margin: '0px 5px 0px -4px' }} />
        }
        return (
            <div className="checkbox CheckBox" style={style}  >
                <label >
                    <input type="checkbox" checked={checked} onClick={this.onChange.bind(this)} />
                    {icon}
                    {label}
                </label>
            </div>
        )
    }
}