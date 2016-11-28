import React, { Component, PropTypes } from 'react'
/**
 * 
 */
export default class Panel extends Component {
    constructor(props) {
        super(props);
    }
    
    onClick() {
        // let {isFullscreen} = this.state;
        let isFullscreen =  window.document.body.clientHeight == window.screen.height
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
            var container = document.getElementById('trunk')
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
            <span className="glyphicon glyphicon-fullscreen" onClick={onClick.bind(this)} ></span>
        )
    }
}





