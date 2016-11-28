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

        children.length || (children = [children])
        for (let i = 0, l = children.length, item, li, label; i < l; i++) {
            item = children[i]
            label = <a href="#">{ (l===1 && state.label ) || item.props.label}</a>
            if (i === selIndex) {
                selItem = item;
                li = <li key={i} className="active" >{label}</li>
            } else {
                li = <li key={i} onClick={onClick.bind(this, i)} >{label}</li>
            }
            list.push(li)
        }
       
        return (
            <div className="NavTab" style={{height:height || 50}}>
                <ul className="nav nav-tabs Tabs" >
                    {list}
                </ul>
                {selItem}
            </div>
        );
    }
}