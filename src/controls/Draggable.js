/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import draggable from '../../libs/draggable'
/**
 * 
 */
export default class Draggable extends Component {
    /**
     * 渲染
     */
    render() {
        let { props } = this,
            { disable, children } = props;
        if (!disable) {
            let drag = component => {
                component.ref = node => {
                    node && draggable(node)
                }
            }
            T.isArray(children) ? children.forEach(drag) : drag(children)
        }
        return children
    }
}