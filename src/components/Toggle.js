import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 开关、切换按钮
 */
export default class Toggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProvider: props.dataProvider,
            selIndex: props.dataProvider ? 0 : 1,
            dataField: props.dataField || 'value',
            tag: props.tag || 'img'
        }
    }

    onClick() {
        let {props, state} = this,
            {dataProvider, selIndex} = state,
            {onClick} = props
        selIndex++
        if (selIndex < 0 || selIndex >= dataProvider.length) {
            selIndex = 0;
        }
        this.setState({
            selIndex: selIndex
        })
        onClick && onClick(selIndex, state)
    }

    createImg(data,style,onClick) {
        let className = classNames('Toggle')
        return <img className={className} style={style}  src={data} onClick={onClick} />
    }

    createI(data,style,onClick) {
        let className = classNames('Toggle',data)
        return <i className={className} style={style} onClick={onClick} />
    }

    render() {
        let {props, state, onClick} = this,
            {tag, dataProvider, selIndex} = state,
            item,style
        if (dataProvider) {
            item = dataProvider[selIndex]
            if (typeof (item) !== "string") {
                item = item[props.dataField]
            }
            style = item.style || props.style;
            onClick = onClick.bind(this)
            switch (tag) {
                case 'i':
                    return this.createI(item,style,onClick)
                default:
                    return this.createImg(item,style,onClick)
            }
        }
    }
}