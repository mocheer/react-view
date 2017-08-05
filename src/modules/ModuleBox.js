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
            Content: data._leaf
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
        let that = this,
            { loaded, props, state } = that,
            { data } = props,
            { label } = data,
            { component } = state;
        if (!component) {
            let options = {
                props: { height: 500 },
                deps: ['leaf/typhoon/typhoon', 'leaf/typhoon/config.' + T.Map.platform]
            }
            let branch = T.add(options, () => {
                this.setState({ component: branch._leaf })
            })
            return null;
        }
        //
        return (
            <div className='shadow' style={{ width: 300, margin: 5 }}  >
                <div onMouseDown={this.toDrag.bind(this)} style={{ height: 33, background: '#1c7be8', borderTop: '4px solid #509ff7', color: '#fff' }} >
                    <label style={{ margin: 3 }}>{label}</label>
                    <div style={{ position: 'absolute', right: 10, padding: 2, display: 'inline-block' }}>
                        <img role='button' src='tree/assets/common/btn-expand.png' style={{ margin: 2 }} />
                        <img role='button' src='tree/assets/common/btn-plus.png' width='15' style={{ margin: 2 }} />
                        {/*<i className='tf tf-plus' role='button' style={{ padding: 5, fontSize: 16 }} />*/}
                        <img role='button' src='tree/assets/common/btn-close.png' style={{ margin: 2 }} />
                    </div>
                </div>
                <div style={{ backgroundColor: '#fff' }} >
                    {component}
                </div>
            </div>
        )
    }
}