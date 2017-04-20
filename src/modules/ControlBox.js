import React, { Component, PropTypes } from 'react'
import ZoomIn from './controls/ZoomIn'
import ZoomOut from './controls/ZoomOut'
import FullScreen from './controls/FullScreen'
import ModuleExpand from './controls/ModuleExpand'
import DistanceMeature from './controls/DistanceMeature'
import Clear from './controls/Clear'
/**
 * 
 */
export default class ControlBox extends Component {
    constructor(props) {
        super(props);
    }

    onOver(e) {
        let {target, currentTarget} = e
        if (target !== currentTarget) {
            let dataset = target.dataset,
                label = dataset.label;
            label && T.do('tooltip', {
                label: label,
                placement: 'left',
                target: e.target
            })
        }
    }
    onOut() {
        T.do('tooltip', {hide:true})
    }

    render() {
        let {props} = this,
            {showZoom, showFullScreen, showModuleExpand,showDistanceMeature} = props,   
            controls = [];
        showZoom && controls.push(<ZoomIn />, <ZoomOut />)
        showFullScreen && controls.push(<FullScreen />)
        showDistanceMeature && controls.push(<DistanceMeature />)  && controls.push(<Clear />)
        showModuleExpand && controls.push(<ModuleExpand />)
        return (
            <div className='ControlBox' onMouseOver={this.onOver} onMouseOut={this.onOut}>
                {controls}
            </div>
        )
    }
}

//设置默认属性
ControlBox.defaultProps = {
    showZoom: true,
    showFullScreen: true,
    showModuleExpand: true,
    showDistanceMeature:true
};