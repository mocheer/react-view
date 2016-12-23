import React, { Component, PropTypes } from 'react'
import Panel from '../containers/Panel'
/**
 * 图例
 */
export default class LegendBox extends Component {
    constructor(props) {
        super(props);
        if (window.T) {
            T.on('addLegend', this.add.bind(this))
            T.on('removeLegend', this.remove.bind(this))
        }
        this.state = {
            dataProvider: props.dataProvider
        }
    }
    /**
     * @param data [{title,body}]
     */
    add(data) {
        let {state} = this,
            {dataProvider} = state
        if (!dataProvider) {
            dataProvider = data;
        } else {
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
        console.log('remvoe')
        let {state} = this,
            {dataProvider} = state
        if (dataProvider) {
            dataProvider = dataProvider.filter((item,index,array)=>{
                return data.indexOf(item) ==-1
            })
            this.setState({
                dataProvider: dataProvider
            })
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