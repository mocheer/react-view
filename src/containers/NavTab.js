/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
/**
 * props{title,content,footer}
 */
export default class NavTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selIndex: 0
        };
    }
    onClick(index) {
        this.setState({ selIndex: index })
    }
    render() {
        let {props, state, onClick} = this,
            {height,children} = props,
            {selIndex} = state,
            list = [],
            selItem

        children = children.length?children:[children]
        height = height || 50
        let ch = 33;//nav 高度
        for (let i = 0, l = children.length, item, li, label; i < l; i++) {
            item = children[i]
            let {props} = item
            if(!props.height){
                props.height = height - ch;
            }
            label = <a>{ (l===1 && state.label ) || props.label}</a>
            if (i === selIndex) {
                selItem = item;
                li = <li key={i} className="active" >{label}</li>
            } else {
                li = <li key={i} onClick={onClick.bind(this, i)} >{label}</li>
            }
            list.push(li)
        }
        //nav-pills 胶囊式标签页  nav-stacked 垂直排列  nav-justified 同等宽度
        //nav-tabs
        return (
            <div className="NavTab" style={{height:height}}>
                <ul className="nav nav-tabs Tabs" >
                    {list}
                </ul>
                {selItem}
            </div>
        );
    }
}