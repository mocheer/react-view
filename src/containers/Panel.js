import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * props{title,content,footer}
 */
export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collopse:false
        }
    }

    onTitleClick(){
        let {state} = this,
            {collopse} = state;
        this.setState({
            collopse:!collopse
        })
    }

    createTitle(title) {
        let {onTitleClick} = this; 
        return <div className="panel-heading" onClick={onTitleClick.bind(this)}>{title}</div>
    }
    

    createBody(body) {
        return <div className="panel-body">{body}</div>
    }

    createFooter(body) {
        return <div className="panel-footer">{footer}</div>
    }

    render() {
        let {props, state} = this,  
            {title, body, footer, children, className} = props,
            {collopse} = state,
            content = [],
            panelClass = classNames('panel Panel',className || 'panel-primary');//panel-default
        title && content.push(this.createTitle(title))
        if (!collopse) {
            body && content.push(this.createBody(body))
            children && content.push(children)
            footer && content.push(this.createFooter(footer))
        }
        return (
            <div className={panelClass} >
                {content}
            </div>
        );
    }
}