/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
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
        let { props, state } = this;
        let { dataProvider, onClick, group } = props;
        let { selIndex } = state;
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
                    if (item !== this) {
                        item.setState({ selIndex: 0 })
                    }
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
        let { props, state } = this;
        let { dataProvider, onClick } = props;
        let { selIndex } = state;
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

        style = style || {};
        style.margin = 0
        return <label style={style} onClick={onClick} role='button' ><img src={data} />{this.props.label}</label>
    }
    /**
     * 
     * @param {*} data 
     * @param {*} style 
     * @param {*} onClick 
     */
    createI(data, style, onClick) {
        return <i role='button' className={data} style={style} onClick={onClick} >{this.props.label}</i>
    }
    /**
     * 
     */
    render() {
        let { props, state } = this,
            { tag, src, dataProvider, dataField, group } = props,
            { selIndex } = state,
            item, style;
        if (src) {
            dataProvider = [src]
        }
        if (group && group.indexOf(this) === -1) {
            group.push(this)
        }
        let icon;
        if (dataProvider) {
            item = dataProvider[selIndex]
            if (typeof (item) !== "string" && dataField) {
                item = item[dataField]
            }
            style = item.style || props.style;
            let onClick = this.onClick.bind(this)
            if (props.wrapper === 'button') {
                onClick = null;
            }

            switch (tag) {
                case 'i':
                    icon = this.createI(item, style, onClick)
                    break;
                default:
                    icon = this.createImg(item, style, onClick)
                    break;
            }
        }
        if (props.wrapper === 'button') {
            icon = <button type="button" className="btn btn-default" onClick={this.onClick.bind(this)}>{icon}</button>
        }
        return icon;
    }
}