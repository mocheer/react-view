import React, { Component, PropTypes } from 'react'
import Panel from '../containers/Panel'
/**
 * 图例
 */
export default class LegendBox extends Component {
    constructor(props) {
        super(props);
        if (window.T) {
            T.on('addLegend', this.add)
            T.on('removeLegend', this.remove)
        }
        this.state = {
            dataProvider: props.dataProvider || [
                {
                    title: '台风图例', children: [
                        { label: '热带低压', color: '#00FF03' },
                        { label: '热带风暴', color: '#0062FE' },
                        { label: '强热带风暴', color: '#FAE100' },
                        { label: '台风', color: '#FDAC03' },
                        { label: '强台风', color: '#FD72F6' },
                        { label: '超强台风', color: '#FD0002' }
                    ]
                },
                {
                    title: '预报机构', children: [
                        { label: '中国', color: '#FF4050', type: 'dash' },
                        { label: '韩国', color: '#000', type: 'dash' },
                        { label: '美国', color: '#4099EE', type: 'dash' },
                        { label: '中国台湾', color: '#FFA040', type: 'dash' },
                        { label: '日本', color: '#43FF4B', type: 'dash' },
                        { label: '中国香港', color: '#FF40F5', type: 'dash' }
                    ]
                }
            ]
        }
    }
    /**
     * @param data {title,body}
     */
    add(data) {
        let {state} = this,
            {dataProvider} = state
        if (!dataProvider) {
            dataProvider = [];
        }
        dataProvider.push(data);
        this.setState({
            dataProvider: dataProvider
        })
    }
    /**
     * @param data id || {}
     */
    remove(data) {
        let {state} = this,
            {dataProvider} = state
        if (dataProvider) {
            let index = dataProvider.indexOf(data);
            if (index != -1) {
                dataProvider.splice(index, 1);
            }
        }
    }
    /**
     * 
     */
    removeAll() {
        this.setState({
            dataProvider: null
        })
    }
    /**
     * @param data {title,body}
     */
    createLegend(data) {
        let {title, body, children, footer} = data,
            column = data.column || 2,
            w = data.width || 180,
            iw = w / column,
            newChildren
        if (children) {
            newChildren = [];
            let lineItem;
            for (let i = 0, l = children.length, item; i < l; i++) {
                item = children[i]
                switch (item.type) {
                    case 'dash':
                        item = this.createDash(item, iw)
                        break;
                    default://circle
                        item = this.createCircle(item, iw)
                        break;
                }
                if (i % 2 === 0) {
                    lineItem = [];
                    newChildren.push((
                        <div style={{ margin: 3, width: w }}>
                            {lineItem}
                        </div>
                    ))
                }
                lineItem.push(item)

            }
        }
        return (<Panel title={title} body={body} footer={footer} >
            {newChildren}
        </Panel>)
    }
    /**
     * 
     */
    createCircle(data, w) {
        let style = {
            display: 'inline-block',
            marginLeft: 5,
            marginRight: 5,
            width: 10,
            height: 10,
            background: data.color,
            "-moz-border-radius": 5,
            "-webkit-border-radius": 5,
            "border-radius": 5
        }
        return (<div style={{ display: 'inline-block', width: w }}>
            <div style={style} />
            <span >{data.label}</span>
        </div>)
    }
    /**
     * 
     */
    createDash(data, w) {
        let style = {
            display: 'inline-block',
            marginLeft: 5,
            marginRight: 5,
            width: 18,
            height: 6,
            borderTop: '2px dashed ' + data.color
        }
        return (<div style={{ display: 'inline-block', width: w }}>
            <div style={style} />
            <span >{data.label}</span>
        </div>)
    }
    /**
     * 
     */
    render() {
        let {props, state, createLegend} = this,
            {dataProvider} = state
        if (!dataProvider) {
            return null;
        }
        createLegend = createLegend.bind(this);
        let content = [];
        for (let i = 0, l = dataProvider.length, item; i < l; i++) {
            item = dataProvider[i]
            content.push(createLegend(item))
        }
        return (
            <div className='LegendBox'>
                {content}
            </div>
        )
    }
}