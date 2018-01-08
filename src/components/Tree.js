/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react';
/**
 * 
 */
export default class Tree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: props.collapsed,
            labelField: props.labelField || 'label',
            icon: props.icon,
        }
    }
    /**
     * 
     */
    render() {
        return null
    }
}