/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
// import classNames from 'classnames'

export default class Radio extends Component {
    render() {
        var label = this.props.label
        return (
            <div className="radio">
                <label>
                    <input type="radio" />{label}
                </label>
            </div>
        )
    }
}