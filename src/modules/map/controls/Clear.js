
import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class Clear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expaned: props.expaned
        }
    }

    onClick() {
        T.map.setTool({ tool: 'clear' })
    }

    render() {
        let { state, onClick } = this,
            { epxanded } = state,
            cls = 'tf tf-clear-fill'
        return (
            <i className={cls} data-label='清除'  onClick={onClick.bind(this)} />
        )
    }
}