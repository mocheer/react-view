import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class ZoomOut extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
         let tmap = T.map
        tmap.zoomBy(-1)
    }
    render() {
        let {onClick} = this
        return (
            <i className="tf tf-minus" data-label='缩小' onClick={onClick.bind(this)} />
        )
    }
}