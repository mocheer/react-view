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
        
    }

    onClick() {
        T.map.do('tmap-draw', { tool: 'polyline' })
    }

    render() {
        let { state, onClick } = this,
            { epxanded } = state
        return (
            <i className='tf tf-draw-line-measure' data-label='测距'  onClick={onClick.bind(this)} />
        )
    }
}