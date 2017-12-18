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
        let { props } = this,
            { auto } = props;

        return (
            <textarea ref={textarea => {
                if (textarea && auto) {
                    textarea.style.height = textarea.scrollHeight + 'px';
                }
            }} className="form-control" rows={this.props.rows}></textarea>
        );
    }
}
TextArea.defaultProps = {
    rows: 1
};//设置默认属性

