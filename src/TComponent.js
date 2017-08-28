/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 
 */
export default class TComponent extends Component {
    // _action
    constructor(props) {
        super(props)
        props.on && this.on(props.on)
    }
    /**
     * 
     */
    get style() {
        return this.props.style;
    }
    /**
     * 
     */
    get className() {
        return this.props.className;
    }
    /**
     * 
     */
    suspend() {
        this.do('suspend');
    }
    /**
     * 
     */
    resume() {
        this.do('resume');
    }
    /**
     * 
     */
    componentWillUnmount() {
        this.suspend();
    }
    /**
     * 
     * @param {*} types 
     */
    on(types, fn) {
        let action = this._action = this._action || new T.Action();
        action.on(types, fn)
    }
    /**
     * 
     * @param {*} type 
     * @param {*} data 
     */
    do(type, data) {
        let { _action } = this;
        _action && _action.do(type, data)
    }
    /**
     * 
     * @param {*} type 
     * @param {*} fn 
     */
    off(type, fn) {
        let { _action } = this;
        _action && _action.off(type, fn)
    }
}