/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
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
        return true
    }
    /**
     * 
     * @param {*} types 
     */
    on(types) {
        let action = this._action = this._action || new T.Action();
        action.on(types)
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