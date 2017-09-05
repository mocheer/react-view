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
 */
export default class Modal extends Component {

    static show(props, name) {
        ReactDOM.render(<Modal {...props} />, T(name || 'Modal', 'div'))
    }


    /**
     * 
     */
    render() {
        let { props, state } = this,
            { closed } = state || {},
            { title, content, onConfirm, confirmLabel, cancelLabel, visible, height, showCancel, showSubmit } = props
        //
        if (closed) {
            state.closed = false;
            return null
        }

        content = content && <div className="modal-body">{content}</div>
        let cancelBtn = showCancel !== false && <button type="button" className="btn btn-default" onClick={e => this.setState({ closed: true })}>{cancelLabel || '取消'}</button>
        let submitBtn = showSubmit !== false && <button type="button" className="btn btn-primary" onClick={e => {
            if (onConfirm) {
                onConfirm()
            } else {
                this.setState({ closed: true })
            }
        }} >{confirmLabel || '确定'}</button>
        //
        return (
            <div className="modal fade in" tabindex="-1" role="dialog" style={{ backgroundColor: 'rgba(200,200,200,0.8)', display: visible === false ? 'none' : 'block' }}>
                <div className="modal-dialog"  >
                    <div className="modal-content" >
                        <div className="modal-header" >
                            <button type="button" className="close" onClick={e => this.setState({ closed: true })}>&times;</button>
                            <h4 className="modal-title" >{title}</h4>
                        </div>
                        {content}
                        <div className="modal-footer" style={content ? { paddingTop: 8, borderTop: 0 } : null} >
                            {cancelBtn}
                            {submitBtn}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}