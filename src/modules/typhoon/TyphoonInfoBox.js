/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.4.11
 */
import React, { Component, PropTypes } from 'react'
/**
 * 台风信息框
 */
export default class TyphoonInfoBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suspended: false,
            expanded: false,
            info: null
        }
        T.on('typhooninfoChange', this.onChange.bind(this))
    }

    onChange(data) {
        let {tf} = data,
            info = '<span style="display:block;width:100%;text-align:center;height:20px;color:blue;font-size:13px;padding:0px;">' +
                tf.tfbh + tf.name + "(" + tf.ename + ')</span>' + data.info
        this.setState({ expanded: true, info: info })
    }

    collpase() {
        this.setState({ expanded: false })
    }

    expand() {
        this.setState({ expanded: true })
    }

    suspend() {
        this.setState({ suspended: true })
    }

    resume() {
        this.setState({ suspended: false })
    }

    render() {
        let {state} = this,
            {suspended, expanded} = state
        if (suspended) {
            return null;
        }
        if (!expanded) {
            return <img style={{ cursor: 'pointer' }} src='tree/assets/typhoon/infoExpand.png' onClick={this.expand.bind(this)} />
        }
        let {info} = state
        if (!info) {
            return <img role='button' src='tree/assets/typhoon/noInfo.png' onClick={this.collpase.bind(this)} />
        }

        return (
            <div>
                <img style={{ width: 200, height: 220 }} src='tree/assets/typhoon/info.png' />
                <div dangerouslySetInnerHTML={{ __html: info }} style={{ height: 200, padding: '8px 0px 0px 10px', fontSize: 13, lineHeight: '21px', position: 'absolute', left: 0, top: 0 }} />
                <img onClick={this.collpase.bind(this)} style={{ cursor: 'pointer', position: 'absolute', bottom: 12, right: 6 }} src='tree/assets/typhoon/collpase.png' />
            </div>
        )
    }
}