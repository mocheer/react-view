/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
import TComponent from '../TComponent'
/**
 * 
 */
export default class ModuleBox extends TComponent {
    constructor(props) {
        super(props);
    }
    /**
     * 
     */
    render() {
        let { props } = this,
            { dataProvider } = props,
            ms = [];
        for (let i = 0, len = dataProvider.length, item; i < len; i++) {
            item = dataProvider[i];
            !item.suspend && ms.push(<Module data={item} />)
        }
        return (
            <div style={{ position: 'absolute', top: 140, left: 55 }} >
                {ms}
            </div>
        )
    }
}
/**
 * 模块加载器
 */
class Module extends TComponent {
    constructor(props) {
        super(props);
        let { data } = props;
        this.state = {
            Content:data._leaf
        }
    }
    /**
     * 
     * @param {*} e 
     */
    toDrag(e) {
        this.setState({ dragging: true })
    }
    /**
     * 
     */
    render() {
        let { loaded, props, state } = this,
            { data } = props,
            { label } = data,
            {Content} = state;
        if (!Content) {
            T.require(['leaf/typhoon/typhoon', 'leaf/typhoon/config.' + T.Map.platform], (Content, config) => {
                Content = Content.default
                Content =  data._leaf = <Content height="500" conf={config} />
                Content.conf = config;
                this.setState({ Content: Content})
            })
            return null;
        }
        //
        return (
            <div className='shadow' style={{ width: 300, margin: 5 }}  >
                <div onMouseDown={this.toDrag.bind(this)} style={{ height: 33, background: '#1c7be8', borderTop: '4px solid #509ff7', color: '#fff' }} >
                    <label style={{ margin: 3 }}>{label}</label>
                </div>
                <div style={{ backgroundColor: '#fff' }} >
                   {Content}
                </div>
            </div>
        )
    }
}