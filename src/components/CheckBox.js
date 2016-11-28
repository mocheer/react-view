import React, { Component, PropTypes } from 'react'
// import classNames from 'classnames'

export default class CheckBox extends Component{
    render() {
        var label = this.props.label
        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" />{label}
                 </label>
            </div>
        )
    }
}