import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class ZoomIn extends Component {
    constructor(props) {
        super(props);
    }
    
    onClick() {
        let {mapbox} = this.props;
        mapbox.zoomBy(1)
    }
    render() {
        let {onClick} = this
        return (
            <span className="glyphicon glyphicon-plus" onClick={onClick.bind(this)} ></span>
        )
    }
}