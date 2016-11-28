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
        let {onClick} = this,
            styl = {
                paddingLeft:5
            }
        return (
            <span className="glyphicon glyphicon-minus" style={styl} onClick={onClick.bind(this)} ></span>
        )
    }
}