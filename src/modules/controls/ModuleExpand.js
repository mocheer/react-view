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
        window.T && T.do('moduleexpand',to)
    }

    render() {
        let {state,onClick} = this,
            {epxanded} = state;
        return (
            <i className='tf tf-move-lr'  onClick={onClick.bind(this)} />
        )
    }
}