/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
// import classNames from 'classnames'
let group = []
/**
 * 
 */
export default class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
        group.push(this)
    }
    /**
     * 
     */
    handleChange(e) {
        let { props, state } = this;
        if (state.checked === true) {
            return;
        }
        group.forEach(item => {
            if (item !== this) {
                item.setState({ checked: false })
            }
        })
        this.setState({ checked: true })
        props.onChange && props.onChange()
    }
    /**
     * 
     */
    render() {
        let { props, state } = this,
            { label } = props,
            { checked } = state;
        // defaultChecked={checked} 
        return (
            <div className="radio" style={{ display: 'inline', marginRight: 2 }} onClick={this.handleChange.bind(this)} >
                <label>
                    <input type="radio" checked={checked} />
                    {label}
                </label>
            </div>
        )
    }
}