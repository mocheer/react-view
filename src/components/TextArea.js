/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class TextArea extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <textarea className="form-control" rows={this.props.rows}></textarea>
        );
    }
}
TextArea.defaultProps = {
    rows: 3
};//设置默认属性

