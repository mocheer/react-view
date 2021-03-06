/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

/**
 * props{title,content,footer}
 */
export default class NavTab extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            selIndex: props.selIndex || 0
        };
    }
    /**
     * 
     * @param {*} index 
     */
    onClick(index) {
        let { props } = this;
        props.onClick && props.onClick({ selIndex: index })
        props.onTabChange && props.onTabChange({ target: this, selIndex: index })
        this.setState({ selIndex: index })
    }
    /**
     * 渲染
     */
    render() {
        let { props, state, onClick } = this,
            { height, children, justified, style, headerStyle, itemWidth } = props,
            { selIndex } = state,
            list = [],
            selItem
        if (!children) {
            return null;
        }
        children = children.length ? children : [children]
        height = height || 50
        let ch = 36,//nav 高度 36
            i = 0,
            l = children.length,
            item, li, label,
            create = item => {
                let { props } = item
                if (!props.height && height > 50) {
                    props.height = height - ch;
                }
                let active = i === selIndex;
                //在360浏览器下 会换行。
                label = <a style={{ color: active ? null : 'inherit' }}>{(l === 1 && state.label) || props.label}</a>
                if (active) {
                    selItem = item;
                    li = <li style={{ width: itemWidth }} key={i} className="active" >{label}</li>
                } else {
                    li = <li style={{ width: itemWidth }} key={i} role='button' onClick={onClick.bind(this, i)} >{label}</li>
                }
                list.push(li)
            }
        for (; i < l; i++) {
            item = children[i]
            if (!item) {
                break;
            }
            create(item)
        }
        //nav-pills 胶囊式标签页
        //nav-stacked 垂直排列 
        //nav-justified 同等宽度
        let ulClassName = classNames('nav nav-tabs', justified && 'nav-justified')
        style = Object.assign({}, style, { height: height })
        return (
            <div className="NavTab" style={style}>
                <ul className={ulClassName} style={headerStyle} >
                    {list}
                </ul>
                {selItem}
            </div >
        );
    }
}

/**
 * 
 */
NavTab.defaultProps = {

}