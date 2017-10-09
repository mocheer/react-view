/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

/**
 * 模态框
 * @param title
 * @param content
 */
export default class Modal extends Component {
    /**
     * 
     * @param {*} props 
     */
    static show(props) {
        ReactDOM.render(<Modal {...props} />, T('Modal', 'div'))
    }
    /**
     * 
     * @param {*} props 
     */
    static popup(props) {
        props = Object.assign({ isPop: true, width: document.body.clientWidth - 100, height: 700 }, props)
        ReactDOM.render(<Modal {...props} />, T('Modal', 'div'))
    }
    /**
     * 
     */
    render() {
        let { props, state } = this,
            { closed } = state || {},
            { title, content, onConfirm, onClosed, confirmLabel, cancelLabel, visible,
                width, height, showCancel, isPop, url } = props
        //
        if (closed) {
            state.closed = false;
            return null
        }
        //
        content = !isPop && content && <div className="modal-body">{content}</div>
        let footer = isPop ? null : (
            <div className="modal-footer" style={content ? { paddingTop: 8, borderTop: 0 } : null} >
                {
                    showCancel !== false && <button ref={btn => this.cancelBtn = btn} type="button" className="btn btn-default" onClick={e => this.setState({ closed: true })}>{cancelLabel || '取消'}</button>
                }
                <button ref={btn => this.submitBtn = btn} type="button" className="btn btn-primary" onClick={e => {

                    if (onConfirm) {
                        onConfirm()
                    } else {
                        this.setState({ closed: true })
                    }
                }} >{confirmLabel || '确定'}</button>
            </div>
        )
        let iframe = isPop ? <iframe src={url} width={width} height={height} frameBorder='0' scrolling='none' /> : null
        //
        return (
            <div className="modal fade in" tabindex="-1" role="dialog" style={{ backgroundColor: 'rgba(200,200,200,0.8)', display: visible === false ? 'none' : 'block' }}>
                <div className="modal-dialog"  >
                    <div className="modal-content" style={{ width: width && (width + 10) }} >
                        <div className="modal-header" >
                            <button type="button" className="close" onClick={e => {
                                onClosed && onClosed();
                                this.setState({ closed: true })
                            }}>&times;</button>
                            <h4 className="modal-title" >{title}</h4>
                        </div>
                        {iframe}
                        {content}
                        {footer}
                    </div>
                </div>
            </div>
        )
    }
}