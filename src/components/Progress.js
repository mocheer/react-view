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
export default class Progress extends Component {
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
        let { props, state } = this,
            { auto } = props,
            { val } = state,
            { toPercent } = T;
        if (auto) {
            setTimeout(() => {

            }, 100);
        }
        val = toPercent(val);
        return (
            <div className="progress">
                <div className="progress-bar" style={{ width: val, minWidth: 20 }}>
                    {val}
                </div>
            </div>
        );
    }
}
//设置默认属性
Progress.defaultProps = {

};