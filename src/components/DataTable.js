/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TComponent from 'react-view/src/TComponent'
import Draggable from 'react-view/src/controls/Draggable'
let { assets } = T
/**
 * 
 */
export default class ModuleBox extends TComponent {
    // multi
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    /**
     * 
     */
    get width() {
        let { container } = this.refs;
        return container && container.clientWidth;
    }
    /**
     * 
     */
    get height() {
        let { container } = this.refs;
        return container && container.clientHeight;
    }
    /**
     * 渲染
     */
    render() {
        let { props, state } = this,
            { dataProvider, multi, style } = props,
            { expanded } = state,
            ls = [];
        if (!dataProvider || dataProvider.length === 0) {
            if (expanded) {
                state.expanded = void 0;
                setTimeout(() => {
                    T.data('module-expanded', false);
                    let { container } = this.refs;
                    T.data('module-expand-width', container && container.parentNode.clientWidth)
                    T.do('module-expand', { target: this, expanded: false, cx: 57 })
                }, 20);
            }
            return null;
        }
        let selIndex = dataProvider.length - 1;//dataProvider.length - 1
        if (!multi) {
            //单例选中
            while (selIndex > 0) {
                if (!dataProvider[selIndex].suspend) {
                    break;
                }
                selIndex--;
            }
        }
        let init;
        if (init = expanded === void 0) {//默认加载第一个模块时expand
            state.expanded = expanded = true;
            T.data('module-expanded', expanded)
            selIndex = 0;
        }
        //
        for (let i = 0, len = dataProvider.length, item; i < len; i++) {
            item = dataProvider[i];
            if (!item.suspend) {
                let style = { display: (multi || i === selIndex) && expanded ? 'block' : 'none' }
                if (init && i === selIndex) {
                    //先暂定365
                    setTimeout(() => {
                        let { container } = this.refs;
                        T.data('module-expand-width', container && container.parentNode.clientWidth)
                        T.do('module-expand', { target: this, expanded: expanded, cx: container && container.parentNode.clientWidth })
                    }, 500);
                }
                ls.push(
                    <Module key={T.stamp(item)} data={item} style={style} multi={multi}
                        on={{
                            closed: e => {
                                item.suspend = true;
                                this.forceUpdate();
                                this.do('closed');
                            }
                        }} />
                )
            }
        }

        return (
            <div ref='container' style={style} >
                {ls}
                <img role='button' draggable={false}
                    src={`${assets}common/module-${expanded ? 'collpase' : 'expand'}.png`}
                    style={{ position: 'absolute', right: -29, top: 0 }}
                    onClick={e => {
                        let to = !expanded
                        this.setState({ expanded: to })
                        setTimeout(() => {
                            T.data('module-expanded', to)
                            let { container } = this.refs;
                            T.data('module-expand-width', container && container.parentNode.clientWidth)
                            T.do('module-expand', { target: this, expanded: to, cx: container && container.parentNode.clientWidth })
                        }, 10);
                    }}
                />
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
            component: data._leaf
        }
    }
    /**
     * 
     */
    get width() {
        let { container } = this.refs;
        return container && container.clientWidth;
    }
    /**
     * 
     */
    get height() {
        let { container } = this.refs;
        return container && container.clientHeight;
    }
    /**
     * 关闭
     */
    onClose() {
        this.do('closed')
    }
    /**
     * 最小化
     */
    onMin() {
        this.setState({ min: !this.state.min })
    }
    /**
     * todo:创建标题栏
     * @param {*} label 
     */
    createTitle(label) {
        return (
            <div style={{ height: 33, background: '#52a0f8', color: '#fff' }} >
                <label style={{ margin: 5 }}>{label}</label>
                <div style={{ position: 'absolute', right: 1, padding: 2, paddingTop: 5, display: 'inline-block' }}>
                    <img role='button' src={assets + 'common/' + (min ? 'fd.png' : 'sx.png')} style={{ marginRight: 5, width: 16 }} onClick={this.onMin.bind(this)} />
                    <img role='button' src={assets + 'common/' + 'gb.png'} style={{ margin: 2, width: 16 }} onClick={this.onClose.bind(this)} />
                </div>
            </div>
        )
    }
    /**
     * 渲染
     */
    render() {
        let that = this,
            { loaded, props, state } = that,
            { data, style, multi } = props,
            { _component: component, label } = data,
            { min } = state;
        //
        let width = 365;
        if (data && data.props) {
            width = data.props.width;
        }
        //
        if (!component && data.deps) {
            let options = {
                get props() {
                    return Object.assign({}, props, { width: this.width, height: this.height || T.height, owner: this, info: data })
                },
                deps: data.deps,
                leaf: data.leaf
            }
            let branch = T.add(options, () => {
                if (branch._leaf) {
                    data._component = branch._leaf
                    this.forceUpdate();
                }
            })
            branch.suspended = true;//不加载到dom
            return null;
        }

        style = Object.assign({
            margin: 0,
            width: width,
            height: '100%',
            borderRight: '2px solid #5AA4F8',
            position: 'relative',
            backgroundColor: '#fff',
            background: '#fff',
            width: width
        }, style)
        //
        return (
            <div ref='container' className='shadow' style={style} >
                {component}
            </div>
        )
    }
}