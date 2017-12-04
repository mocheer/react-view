/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 图标（按钮、多态图、单选图）
 * @param props{
 *      src
 *      dataPorvider
 *      selIndex
 * }
 */
export default class Icon extends Component {
    /**
     * 
     */
    constructor(props) {
        super(props)

        this.state = {
            selIndex: props.selIndex || 0,
            tag: props.tag || 'img'
        }
    }
    /**
     * 
     */
    onClick() {
        let { props, state } = this,
            { dataProvider, onClick, group } = props,
            { selIndex } = state
        //单选
        if (dataProvider) {
            selIndex++
            if (selIndex < 0 || selIndex >= dataProvider.length) {
                if (group) {
                    selIndex--;
                } else {
                    selIndex = 0;
                }
            }
            if (group) {
                group.forEach(item => {
                    item !== this && item.setState({ selIndex: 0 })
                })
            }
            this.setState({ selIndex: selIndex })
        }
        onClick && onClick(selIndex, state)
    }
    /**
     * 
     */
    onHover() {
        let { props, state } = this,
            { dataProvider, onClick } = props,
            { selIndex } = state
        if (dataProvider && dataProvider.length > 1) {
            selIndex++;
            if (selIndex < 0 || selIndex >= dataProvider.length) {
                selIndex = 0;
            }
            let { target } = e;
            target.src = dataProvider[selIndex]
        }
    }
    /**
     * 
     * @param {*} data 
     * @param {*} style 
     * @param {*} onClick 
     */
    createImg(data, style, onClick) {
        return <img role='button' style={style} src={data} onClick={onClick} />
    }
    /**
     * 
     * @param {*} data 
     * @param {*} style 
     * @param {*} onClick 
     */
    createI(data, style, onClick) {
        return <i role='button' className={data} style={style} onClick={onClick} />
    }
    /**
     * 
     */
    render() {
        let { props, state, onClick } = this,
            { tag, src, dataProvider, dataField, group } = props,
            { selIndex } = state,
            item, style;
        if (src) {
            dataProvider = [src]
        }
        if (group && group.indexOf(this) === -1) {
            group.push(this)
        }
        if (dataProvider) {
            item = dataProvider[selIndex]
            if (typeof (item) !== "string" && dataField) {
                item = item[dataField]
            }
            style = item.style || props.style;
            onClick = onClick.bind(this)
            switch (tag) {
                case 'i':
                    return this.createI(item, style, onClick)
                default:
                    return this.createImg(item, style, onClick)
            }
        }
        return null;
    }
}