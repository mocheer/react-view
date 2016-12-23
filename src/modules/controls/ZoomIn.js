import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class ZoomIn extends Component {
    constructor(props) {
        super(props);
    }
    
    onClick() {
        let mapbox = T.get('mapbox')
        mapbox.zoomBy(1)
    }
    render() {
        let {onClick} = this
        return (
            <i className="fa fa-plus" data-label='放大' onClick={onClick.bind(this)} />
        )
    }
}