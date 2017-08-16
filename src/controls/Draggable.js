/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import draggable from '../utils/draggable'
/**
 * 
 */
export default class Draggable extends Component {
    /**
     * 渲染
     */
    render() {
        let { props } = this,
            { children } = props,
            drag = component => {
                component.ref = node => {
                    draggable(node)
                }
            }
        Array.isArray(children) ? children.forEach(drag) : drag(children)
        return children
    }
}