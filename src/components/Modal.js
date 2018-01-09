/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
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
    static iframe(props) {
        props = Object.assign({ iframe: true, width: T.width - 100, height: T.height - 100 }, props)
        ReactDOM.render(<Modal {...props} />, T('Modal', 'div'))
    }
    /**
     * 
     */
    render() {
        let { props, state } = this,
            { closed } = state || {},
            { title, content, footer, onConfirm, onClosed, confirmLabel, cancelLabel, visible,
                width, height, showFooter, showCancel, showConfirm, iframe, url } = props
        //
        if (closed) {
            state.closed = false;
            return null
        }
        //
        if (iframe) {
            content = <iframe src={url} width={width} height={height} frameBorder='0' scrolling='none' />
        } else {
            content = content && <div className="modal-body">{content}</div>
            footer = showFooter && (
                <div className="modal-footer" style={content ? { paddingTop: 8, borderTop: 0 } : null} >
                    {
                        showCancel !== false && <button ref={btn => this.cancelBtn = btn} type="button" className="btn btn-default" onClick={e => this.setState({ closed: true })}>{cancelLabel || '取消'}</button>
                    }
                    {
                        showConfirm !== false && <button ref={btn => this.submitBtn = btn} type="button" className="btn btn-primary" onClick={e => {
                            onConfirm && onConfirm()
                            this.setState({ closed: true })
                        }} >{confirmLabel || '确定'}</button>
                    }
                </div>
            )
        }
        //
        return (
            <div className="modal fade in" tabindex="-1" role="dialog" style={{ backgroundColor: 'rgba(200,200,200,0.8)', display: visible === false ? 'none' : 'block' }}>
                <div className="modal-dialog" style={{ width: width && (width + 10) }}  >
                    <div className="modal-content"  >
                        <div className="modal-header" >
                            <button type="button" className="close" onClick={e => {
                                onClosed && onClosed();
                                this.setState({ closed: true })
                            }}>&times;</button>
                            <h4 className="modal-title" >{title}</h4>
                        </div>
                        {content}
                        {footer}
                    </div>
                </div>
            </div>
        )
    }
}