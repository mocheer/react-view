/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * props{title,content,footer}
 */
export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collopse: false
        }
    }
    /**
     * 标题点击
     */
    onTitleClick() {
        let { state } = this,
            { collopse } = state;
        this.setState({
            collopse: !collopse
        })
    }
    /**
     * 创建标题
     */
    createTitle(title, collopse) {
        let cart
        if (!collopse) {
            cart = <span className='caret' style={{ position: 'absolute', right: 0, marginRight: 8, marginTop: 6 }} />
        }
        return <div className="panel-heading" onClick={this.onTitleClick.bind(this)}>{title}{cart}</div>
    }
    /**
     * 创建内容
     */
    createBody(body) {
        return <div className="panel-body">{body}</div>
    }
    /**
     * 创建底部
     */
    createFooter(body) {
        return <div className="panel-footer">{footer}</div>
    }
    /**
     * 渲染
     */
    render() {
        let { props, state } = this,
            { title, body, footer, children, className } = props,
            { collopse } = state,
            content = [],
            panelClass = classNames('panel Panel', className || 'panel-primary');//panel-default

        title && content.push(this.createTitle(title, collopse))
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