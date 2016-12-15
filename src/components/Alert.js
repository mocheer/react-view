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