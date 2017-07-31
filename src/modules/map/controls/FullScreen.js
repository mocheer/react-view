import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * 
 */
export default class Panel extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        let isFullscreen =  document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width
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
            var container = T.root;
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
    }
    render() {
        let {onClick} = this
        return (
            <i className='tf tf-screen' data-label='全屏' onClick={onClick.bind(this)} />
        )
    }
}





