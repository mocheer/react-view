import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 
 */
export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullscreen: false
        }
    }

    onClick() {
        let {isFullscreen} = this.state;
        // let isFullscreen =  window.document.body.clientHeight == window.screen.height
        if (isFullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            var container = T.get();
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        }
        this.setState({
            isFullscreen: !isFullscreen
        })
    }
    render() {
        let {state, onClick} = this,
            {isFullscreen} = state,
            className = classNames('fa', isFullscreen ? 'fa-compress' : 'fa-expand');
        return (
            <i className={className} data-label='全屏' onClick={onClick.bind(this)} />
        )
    }
}





