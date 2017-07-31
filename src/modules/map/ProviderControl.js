/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
//
export default class ProviderControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
            dataProvider: props.dataProvider,
            // selItem:null,
        }
    }
    expand() {
        this.setState({
            expanded: true
        })
    }

    onMouseOver() {
        this.expand();
    }

    onClick() {

    }

    createMap() {

    }

    render() {
        let { props, state } = this,
            { expanded, dataProvider } = state,
            boxProps = { className: 'MapProviderBox' },
        if (expanded) {
            boxProps.onClick = this.onClick.bind(this)
        } else {
            boxProps.onMouseOver = this.onMouseOver.bind(this)
        }
        return (
            <div {...boxProps} >

            </div>
        )
    }
}