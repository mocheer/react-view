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

    onOver(e) {
        let {target, currentTarget} = e
        if (target !== currentTarget) {
            let dataset = target.dataset,
                label = dataset.label;
            label && T.emit('tooltip', {
                label: label,
                placement: 'left',
                target: e.target
            })
        }
    }
    onOut() {
        T.emit('tooltip', {hide:true})
    }

    render() {
        let {props} = this,
            {showZoom, showFullScreen, showModuleExpand} = props,   
            controls = [];
        showZoom && controls.push(<ZoomIn />, <ZoomOut />)
        showFullScreen && controls.push(<FullScreen />)
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
};