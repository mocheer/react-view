/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
//TODO action
export default class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            count: props.count,
            dataProvider: props.dataProvider
        }
    }
    /**
     *  下一步
     * @param {*} event 
     */
    handleForward(event) {
        var { selectedIndex, count } = this.state;
        if (selectedIndex < count - 1) {
            this.setState({ selectedIndex: selectedIndex + 1 });
        }
    }
    /**
     * 上一步
     * @param {*} event 
     */
    handleBack(event) {
        var { selectedIndex } = this.state;
        if (selectedIndex != 0) {
            this.setState({ selectedIndex: selectedIndex - 1 });
        }
    }
    /**
     * 
     * @param {*} event 
     */
    handleClick(event) {
        var eventTarget = event.target;
        var selectedIndex = parseInt(eventTarget.innerText);
        this.setState({ selectedIndex: selectedIndex });
    }
    /**
     * 
     */
    render() {
        var { handleClick, handleForward, handleBack, state } = this;
        var count = state.count;
        var pageIndexs;
        if (count > 0) {
            var selectedIndex = state.selectedIndex;
            pageIndexs = []
            for (var i = 0; i < count; i++) {
                var li;
                if (i === selectedIndex) {
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