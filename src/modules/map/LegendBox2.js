/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
/**
 * 图例
 */
export default class LegendBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvider: props.dataProvider
        }
        T.on('tmap-addLegend', this.add.bind(this))
        T.on('tmap-removeLegend', this.remove.bind(this))
    }
    /**
     * @param data [{title,body}]
     */
    add(data) {
        if (!data) {
            return;
        }
        let { state } = this,
            { dataProvider } = state
        if (!dataProvider) {
            dataProvider = data;
        } else if (dataProvider.indexOf(data) === -1) {
            dataProvider = dataProvider.concat(data);
        }
        this.setState({
            dataProvider: dataProvider
        })
    }
    /**
     * @param data [{}]
     */
    remove(data) {
        if (!data) {
            return;
        }
        let { state } = this,
            { dataProvider } = state
        if (dataProvider) {
            dataProvider = dataProvider.filter((item, index, array) => {
                return data.indexOf(item) == -1
            })
            this.setState({
                dataProvider: dataProvider
            })
        }
    }
    /**
     * 删除所有图例
     */
    removeAll() {
        this.setState({
            dataProvider: null
        })
    }
    /**
     * @param data {title,content,width,column}
     */
    createLegend(data) {
        let { title, content } = data;
        if (content) {
            if (typeof content === 'string') {
                content = <img src={content} />
            } else {
                let column = data.column || 2,
                    width = data.width || 180,
                    iw = width / column,
                    children = [];
                let lineItem;
                for (let i = 0, l = content.length, item; i < l; i++) {
                    item = content[i]
                    switch (item.type) {
                        case 'dash'://dash
                            item = createDash(item, iw)
                            break;
                        default:    //circle
                            item = createCircle(item, iw)
                            break;
                    }
                    if (i % 2 === 0) {
                        lineItem = [];
                        let style = { margin: 3, width: width }
                        children.push((
                            <div style={style}>
                                {lineItem}
                            </div>
                        ))
                    }
                    lineItem.push(item)
                }
                content = children;
            }
        }
        return (<Panel title={title}  >
            {content}
        </Panel>)
    }
    /**
     * 
     */
    render() {
        let { props, state, createLegend } = this,
            { dataProvider, show } = state,
            content;
        if (dataProvider && show) {
            content = [];
            for (let i = 0, l = dataProvider.length, item; i < l; i++) {
                item = dataProvider[i]
                content.push(createLegend(item))
            }
            content = (
                <div className='shadow' style={{ backgroundColor: '#fff', padding: 10 }}>
                    {content}
                </div>
            )
        }
        return (
            <div className='LegendBox' style={{}} >
                {content}
                <img role='button' src='tree/assets/legend/button.png' onClick={e => { this.setState({ show: !show }) }} />
            </div>
        )
    }
}
/**
 * 
 */
class Panel extends Component {
    render() {
        let { props } = this,
            { title, children } = props
        return (
            <div style={{ display: 'inline-block' }} >
                <label>{title}</label>
                {children}
            </div>
        )
    }
}
/**
  * 
  */
let createCircle = (data, width) => {
    let style = {
        display: 'inline-block',
        marginLeft: 5,
        marginRight: 5,
        width: 10,
        height: 10,
        background: data.color,
        '-moz-border-radius': 5,
        '-webkit-border-radius': 5,
        'border-radius': 5
    }
    return (
        <div style={{ display: 'inline-block', width: width }}>
            <div style={style} />
            <span >{data.label}</span>
        </div>)
}
/**
 * 
 */
let createDash = (data, width) => {
    let style = {
        display: 'inline-block',
        marginLeft: 5,
        marginRight: 5,
        width: 18,
        height: 6,
        borderTop: '2px dashed ' + data.color
    }
    return (
        <div style={{ display: 'inline-block', width: width }}>
            <div style={style} />
            <span >{data.label}</span>
        </div>)
}