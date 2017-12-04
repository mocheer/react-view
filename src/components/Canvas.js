/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2017.4.11
 */
import React, { Component, PropTypes } from 'react'

export default class Canvas extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { props, state } = this,
            { width, height } = props,
            newProps = Object.assign({}, props, {
                width: width * 2,
                height: height * 2
            });
        newProps.style = Object.assign(newProps.style, { width: width, height: height })
        return (
            <canvas {...newProps} />
        )
    }
}