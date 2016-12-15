import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class ToolTip extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {props} = this,
            {placement,content} = props,
            className = classNames('tooltip','fade',placement || 'left','in')
        return (
            <div className={className} role="tooltip">
                <div className="tooltip-arrow"></div>
                <div className="tooltip-inner">{content}</div>
            </div>
        );
    }
}