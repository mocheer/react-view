import React, { Component, PropTypes } from 'react'

/**
 * 
 */
export default class DistanceMeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expaned: props.expaned
        }
    }

    componentDidMount() {
        window.require(['map/layer/DrawLayer'], function (Layer) {
            new Layer().addTo(T.map)
        })
    }

    onClick() {
        T.map.do('tmap-draw', { tool: 'polyline' })
    }

    render() {
        let { state, onClick } = this,
            { epxanded } = state,
            cls = 'fa  fa-pencil'
        return (
            <i className={cls} data-label='测距'  onClick={onClick.bind(this)} />
        )
    }
}