/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames';
//{text}
export default class InputGroup extends Component {
    constructor(props) {
        super(props)
    }
    /**
     * 
     * @param {*} event 
     */
    onClick(event) {
        var { refs, props } = this;
        this.text = refs.textinput.value;
        var { onClick } = props;
        if (typeof (onClick) === "function") {
            onClick(event)
        }
    }
    /**
     * 渲染
     */
    render() {
        var { props, onClick } = this;
        var { label, placeholder } = props;
        var btnClass = classNames("btn", "btn-primary");
        return (
            <div className="input-group">
                <input type="text" ref="textinput" className="form-control" placeholder={placeholder} />
                <div className="input-group-btn">
                    <button className={btnClass} type="button" onClick={onClick.bind(this)} >{label}</button>
                </div>
            </div>
        );
    }
}

InputGroup.defaultProps = {
    placeholder: ''
}