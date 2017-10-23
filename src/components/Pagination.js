/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
//
export default class Pagination extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props)
        this.state = {
            selIndex: 0,
            count: props.count,
            dataProvider: props.dataProvider
        }
    }
    /**
     *  下一步
     * @param {*} event 
     */
    handleForward(event) {
        var { selIndex, count } = this.state;
        if (selIndex < count - 1) {
            this.setState({ selIndex: selIndex + 1 });
        }
    }
    /**
     * 上一步
     * @param {*} event 
     */
    handleBack(event) {
        var { selIndex } = this.state;
        if (selIndex != 0) {
            this.setState({ selIndex: selIndex - 1 });
        }
    }
    /**
     * 
     * @param {*} event 
     */
    handleClick(event) {
        var eventTarget = event.target;
        var selIndex = parseInt(eventTarget.innerText);
        this.setState({ selIndex: selIndex });
    }
    /**
     * 渲染
     */
    render() {
        var { handleClick, handleForward, handleBack, state } = this;
        var count = state.count;
        var pageIndexs;
        if (count > 0) {
            var selIndex = state.selIndex;
            pageIndexs = []
            for (var i = 0; i < count; i++) {
                var li;
                if (i === selIndex) {
                    li = <li className="active" key={i}><a role='button'>{i}</a></li>
                } else {
                    li = <li key={i} ><a role='button' onClick={handleClick.bind(this)}>{i}</a></li>
                }
                pageIndexs.push(li)
            }
        }
        const ulClass = classNames("pagination",
            { "pagination-lg": false },
            { "pagination-sm": false })
        return (
            <nav>
                <ul className={ulClass}>
                    <li><a role='button' onClick={handleBack.bind(this)}><span>&laquo;</span></a></li>
                    {pageIndexs}
                    <li><a role='button' onClick={handleForward.bind(this)}><span>&raquo;</span></a></li>
                </ul>
            </nav>
        );
    }
}