import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

export default class CheckBox extends Component {
    constructor(props) {
        super(props)
    }

    onChange(){
         let {props} = this,
            {onChange} = props,
            selected = this.refs.button.checked;
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
                    <input ref='button' type="checkbox" checked={selected} />{label}
                </label>
            </div>
        )
    }
}