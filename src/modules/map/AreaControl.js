/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
import NavTab from '../../containers/NavTab'
//
export default class AreaControl extends Component {
    constructor(props) {
        super(props)

    }
    /**
     * 
     */
    load() {
        T.ajax({})
    }
    /**
     * 
     */
    toChangeArea() {
        T.do('area-change');
    }
    /**
     * 
     */
    render() {
        let columnStyle = { display: 'inline-block ', cursor: 'pointer', paddingRight: 10 }
        return (
            <div className='shadow' style={{ zIndex: 999, position: 'absolute', right: 50, top: 10, backgroundColor: '#fff', width: 280, height: 300 }} >
                <NavTab height='30' >
                    <div label='福州市' style={{ padding: 5 }}  >
                        <span style={{ padding: 5 }}>当前：福州市</span>
                        <div style={{ padding: 5, lineHeight: 2 }}>
                            <span style={columnStyle}>鼓楼区</span>
                            <span style={columnStyle}>鼓楼区</span>
                            <span style={columnStyle}>鼓楼区</span>
                            <span style={columnStyle}>鼓楼区</span>
                            <span style={columnStyle}>鼓楼区</span>
                            <span style={columnStyle}>鼓楼区</span>
                            <span style={columnStyle}>鼓楼区</span>
                            <span style={columnStyle}>鼓楼区</span>
                        </div>
                    </div>
                    <div label='流域' style={{ padding: 5 }}  >
                        <span style={{ padding: 5 }}>当前：流域</span>
                        <div style={{ padding: 5, lineHeight: 2 }}>
                            <span style={columnStyle}>晋安区</span>
                            <span style={columnStyle}>晋安区</span>
                            <span style={columnStyle}>晋安区</span>
                            <span style={columnStyle}>晋安区</span>
                            <span style={columnStyle}>晋安区</span>
                            <span style={columnStyle}>晋安区</span>
                            <span style={columnStyle}>晋安区</span>
                            <span style={columnStyle}>晋安区</span>
                        </div>
                    </div>
                </NavTab>
            </div>
        )
    }
}
/**
 * 
 */
class TileText extends Component {
    render() {

    }
}