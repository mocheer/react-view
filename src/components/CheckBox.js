/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected:props.selected
        }
    }

    onChange(){
         let {props,state} = this,
            {onChange} = props,
            selected = !state.selected;
        onChange({selected:selected})
        this.setState({
            selected:selected
        })
    }

    render() {
        let {props,state} = this,
            {selected} = state,
            {label,style} = props;
        return (
            <div className="checkbox CheckBox" style={style} onClick={this.onChange.bind(this)} >
                <label >
                    <input  type="checkbox" checked={selected} />{label}
                </label>
            </div>
        )
    }
}