import React, { Component, PropTypes } from 'react'

/**
 * 
 */
export default class ZoomIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expaned:props.expaned
        }
    }
    
    onClick() {
        let {state} = this,
            {epxanded} = state,
            to = !epxanded
        this.setState({
            epxanded:to
        })
        window.T && T.emit('moduleexpand',to)
    }

    render() {
        let {state,onClick} = this,
            {epxanded} = state,
            cls = 'glyphicon ' + (epxanded?'glyphicon-chevron-left':'glyphicon-chevron-right')
        return (
            <span className={cls} onClick={onClick.bind(this)} ></span>
        )
    }
}