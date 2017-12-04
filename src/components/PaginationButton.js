/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 
 */
export default class PaginationButton extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props)
    }
    /**
     * 
     */
    render() {
        const { onClick, label, active, disabled } = this.props;
        const liClass = classNames({ active, disabled })
        return (
            <li className={liClass}>
                <a role='button' onClick={onClick} >
                    <span >{label}</span>
                </a>
            </li>
        );
    }
}
//设置默认属性
PaginationButton.defaultProps = {
    active: false,
    disabled: false
};