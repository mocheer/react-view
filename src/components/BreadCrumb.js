/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 路径导航(面包屑)
 */
export default class BreadCrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvider: props.dataProvider,
            selItem: null
        }
    }
    render() {
        let { state } = this,
            { dataProvider, selItem } = state
        if (!dataProvider) {
            return null
        }
        let content = [];
        for (let i = 0, l = dataProvider.length, item; i < l; i++) {
            item = dataProvider[i];
            if (item !== selItem && i !== l - 1) {
                content.push(<li><a href="#">{item.label}</a></li>)
            } else {
                content.push(<li className="active">{item.label}</li>)
                break;
            }
        }
        return (
            <ol className="breadcrumb">
                {content}
            </ol>
        )
    }
}