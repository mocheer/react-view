/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.4.11
 */
import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class Group extends Component {
    render() {
        let { props } = this,
            { height, children } = props,
            list = [],
            ch = 0;
        children = children.length ? children : [children]
        for (let i = 0, l = children.length, item, li, label; i < l; i++) {
            item = children[i]
            let { props } = item
            if (!props.height) {
                props.height = height - ch;
            }
            ch += props.height;
        }
        return (
            <div style={{background:'#FFFFFF'}}>
                {children}
            </div>
        );
    }
}