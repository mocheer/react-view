/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class Alert extends Component{
    render() {
        let label = this.props.label,
            className = classNames('alert','alert-danger')
        return (
            <div className={className} role="alert">
                {label}
            </div>
        )
    }
}