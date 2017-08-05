/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
import Dropdown from '../components/Dropdown'
import DatePicker from '../components/DatePicker'
/**
 * 事件导向控制器
 */
export default class EventControl extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props)
    }
    /**
     * 
     */
    render() {
        return (
            <div className='shadow' style={{ width: 280, height: 160, position: 'absolute', top: 5, left: 60, backgroundColor: '#fff', zIndex: 999, padding: 5, borderTop: '4px solid #509ff7' }}  >
                <div style={{ margin: 3 }}>
                    <span style={{ paddingRight: 10, paddingLeft: 5 }}>时间:</span>
                    <Dropdown width={73} style={{ marginRight: 10 }} type="button" dataProvider={[2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017, 2017]} />
                    <Dropdown width={72} type="button" dataProvider={['暴雨', '暴雨', '暴雨', '暴雨']} />
                </div>
                <div style={{ margin: 3, paddingBottom: 10, borderBottom: '1px solid rgba(160,160,160,0.75)' }}>
                    <Dropdown width={155} style={{ marginLeft: 46, marginRight: 10 }} type="button" dataProvider={['6月1日至5日强降雨', '6月1日至5日强降雨', '6月1日至5日强降雨']} />
                    <button className="btn btn-default" type="submit" style={{ padding: '3px 6px' }} >添加</button>
                </div>
                <div style={{ margin: 3, paddingTop: 5 }}>
                    <span style={{ paddingRight: 10, paddingLeft: 22 }}>从</span>
                    <DatePicker placeholder='开始时间' value='' format='yyyy-MM-dd HH:mm:ss' style={{ width: 155, marginRight: 10, height: 26 }} />
                    <button className="btn btn-primary" style={{ padding: '3px 6px' }} type="submit">设置</button>
                </div>
                <div style={{ margin: 3 }}>
                    <span style={{ paddingRight: 10, paddingLeft: 22 }}>到</span>
                    <DatePicker placeholder='结束时间' value='' format='yyyy-MM-dd HH:mm:ss' style={{ width: 155, marginRight: 10, height: 26 }} />
                    <button className="btn btn-primary" style={{ padding: '3px 6px' }} type="submit">查询</button>
                </div>
            </div>
        )
    }
}