import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class ZoomOut extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
         let mapbox = T.map
        mapbox.zoomBy(-1)
    }
    render() {
        let {onClick} = this
        return (
            <i className="fa fa-minus" data-label='缩小' onClick={onClick.bind(this)} />
        )
    }
}