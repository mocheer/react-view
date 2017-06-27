/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
import ZoomIn from './controls/ZoomIn'
import ZoomOut from './controls/ZoomOut'
import FullScreen from './controls/FullScreen'
import Expand from './controls/Expand'
import Meature from './controls/Meature'
import Clear from './controls/Clear'
/**
 * 
 */
export default class ControlBox extends Component {
    constructor(props) {
        super(props);
    }

    onMouseOver(e) {
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
    onMouseOut() {
        T.do('tooltip', {hide:true})
    }

    render() {
        let {props} = this,
            {showZoom, showFullScreen, showModuleExpand,showDistanceMeature} = props,   
            controls = [];
        showZoom && controls.push(<ZoomIn />, <ZoomOut />)
        showFullScreen && controls.push(<FullScreen />)
        showDistanceMeature && controls.push(<Meature />)  && controls.push(<Clear />)
        showModuleExpand && controls.push(<Expand />)
        return (
            <div className='ControlBox' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
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