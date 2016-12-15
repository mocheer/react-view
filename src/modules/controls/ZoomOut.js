import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class ZoomOut extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        let {mapbox} = this.props;
        mapbox.zoomBy(-1)
    }
    render() {
        let {onClick} = this
        return (
            <i className="fa fa-minus"  onClick={onClick.bind(this)} />
        )
    }
}