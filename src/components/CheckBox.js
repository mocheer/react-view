import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: props.selected,
            label: props.label,
            data: props.data,
        }
    }

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