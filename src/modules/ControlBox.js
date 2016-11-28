import React, { Component, PropTypes } from 'react'
import ZoomIn from './controls/ZoomIn'
import ZoomOut from './controls/ZoomOut'
import FullScreen from './controls/FullScreen'
import ModuleExpand from './controls/ModuleExpand'
/**
 * 
 */
export default class ControlBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {props} = this,
            {mapbox,showZoom,showFullScreen,showModuleExpand} = props,
            controls = [];
        showZoom && controls.push(<ZoomIn mapbox={mapbox}/>,<ZoomOut mapbox={mapbox}/>)
        showFullScreen && controls.push(<FullScreen />)
        showModuleExpand && controls.push(<ModuleExpand/>)
        return (
            <div className='ControlBox'>
                {controls}
            </div>
        )
    }
}

//设置默认属性
ControlBox.defaultProps ={
    showZoom:true,
    showFullScreen:true,
    showModuleExpand:true,
};