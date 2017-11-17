/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
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
            { height, children, justified, style, headerStyle } = props,
            { selIndex } = state,
            list = [],
            selItem
        if (!children) {
            return null;
        }
        children = children.length ? children : [children]
        height = height || 50
        let ch = 33,//nav 高度
            i = 0,
            l = children.length,
            item, li, label,
            create = item => {
                let { props } = item
                if (!props.height && height > 50) {
                    props.height = height - ch;
                }
                let active = i === selIndex;
                label = <a style={{color:active?null:'inherit'}}>{(l === 1 && state.label) || props.label}</a>
                if (active) {
                    selItem = item;
                    li = <li key={i} className="active" >{label}</li>
                } else {
                    li = <li key={i} role='button' onClick={onClick.bind(this, i)} >{label}</li>
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
T.style('nav>li>a:hover{ background-color: none;}')
/**
 * 
 */
NavTab.defaultProps = {
    headerStyle:{ background: '#E4F3FF', paddingTop: 2, paddingLeft: 2, paddingRight: 2 }
}