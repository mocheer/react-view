import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class ZoomIn extends Component {
    constructor(props) {
        super(props);
    }
    
    onClick() {
        T.map.zoomBy(1)
    }
    render() {
        let {onClick} = this
        return (
            <i className="tf tf-plus" data-label='放大' onClick={onClick.bind(this)} />
        )
    }
}