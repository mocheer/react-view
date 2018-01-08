/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
/**
 * 缩略图
 */
export default class thumbnail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: props.img,
            caption: props.caption,
            text: props.text,
            buttons: null
        }
    }
    render() {
        let { props, state } = this;
        return (
            <div className="thumbnail">
                <img src={props.url} />
                <div className="caption">
                    <h3>{state.caption}</h3>
                    <p>{state.text}</p>
                    <p>
                        <a href="javascript:void(0)" className="btn btn-primary" role="button">Button</a>
                        <a href="javascript:void(0)" className="btn btn-default" role="button">Button</a>
                    </p>
                </div>
            </div>
        );
    }
}