import React, { Component, PropTypes } from 'react'
import QRCode from 'qrcode.react';
import classNames from 'classnames'

/**
 * 右键菜单，插件方式，独立加载
 */
export default class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: null,//用于点击之后的ui渲染
            selIndex: -1,
            point: null,
            dataProvider: props.dataProvider,
        }
        this.init();
    }

    init() {
        document.oncontextmenu = e => {
            this.onContextMenu(e)
            return false
        }
        document.onclick = e => this.onClick(e)
    }

    onContextMenu(e) {
        let event = e || window.event,
            point = [event.clientX, event.clientY]
        this.setState({
            selIndex: -1,
            point: point
        })
    }

    onClick(event) {
        let {state} = this,
            {render} = state;
        if (!render) {
            this.setState({
                point: null
            })
        }
    }
    /**
     * 
     */
    onZoomIn(e) {
        T.map.zoomBy(1)
    }
    /**
     * 
     */
    onZoomOut(e) {
        T.map.zoomBy(-1)
    }
    /**
     * 
     */
    onPan(e) {
        if (esri) {
            let mapbox = T.map,
                {map} = mapbox,
                ScreenPoint = esri.geometry.ScreenPoint,
                point = map.toMap(new ScreenPoint(e.clientX, e.clientY))
            map.centerAt(point)
        }else{

        }
    }
    /**
     * 二维码
     */
    showQRcode() {
        let mapbox = T('mapbox'),
            w = mapbox.clientWidth,
            h = mapbox.clientHeight,
            outter = {
                zIndex: 999, // leaflet需要这样做
                position: 'fixed',
                margin: 'auto',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(119,119,119,0.5)'
            },
            inner = {
                position: 'absolute',
                top: h * 0.5 - 128,
                left: w * 0.5 - 128,
                width: 280,
                height: 280,
                padding: 12,
                backgroundColor: '#FFF'
            },
            onClick = () => {
                this.setState({ render: null })
            }
        this.setState({
            render: (
                <div style={outter} onClick={onClick.bind(this)} >
                    <div style={inner}>
                        <QRCode size={256} value={window.location.href} />
                    </div>
                </div>
            )
        })
    }
    /**
     * @param data{i,label,onMouseOver,onClick,link,badge,active}
     * 
     */
    createItem(data) {
        let itemProps = {},
            children = [],
            label;
        itemProps.className = classNames('list-group-item', { active: data.active });
        //字形
        data.i && children.push(<i className={data.i} />)
        //文本
        if (data.link) {
            label = <a role="button" href={data.link} target='_blank'> {data.label}</a>
        } else {
            label = data.label;
            itemProps.onMouseOver = data.onMouseOver;
            itemProps.onClick = data.onMouseonClickOver;
        }
        children.push(label)
        //
        return <li {...itemProps} >{children}</li>
    }
    /**
     * <li>
          <a role="button"><i className="tf tf-envelope" /> mocheer@foxmail.com</a>
       </li>
     */
    render() {
        let {state} = this,
            {render, selIndex, point, dataProvider} = state;
        if (!point) {//|| !dataProvider
            return null;
        }
        if (render) {
            return render;
        }
        let styl = {
            position: 'absolute',
            left: point[0] + 12,
            top: point[1] + 12
        }, content = [],
            {createItem} = this,
            onZoomIn = this.onZoomIn.bind(this),
            onZoomOut = this.onZoomOut.bind(this),
            onPan = this.onPan.bind(this),
            showQRcode = this.showQRcode.bind(this)
        return (
            <ul className="dropdown-menu ContextMenu" style={styl}>
                <li onClick={onZoomIn}>
                    <a role="button"><i className="tf tf-search-plus" /> 放大 </a>
                </li>
                <li onClick={onZoomOut}>
                    <a role="button"><i className="tf tf-search-minus" /> 缩小</a>
                </li>
                <li onClick={onPan}>
                    <a role="button"><i className="tf tf-circle-point" /> 定位</a>
                </li>
                <li className="disabled" >
                    <a role="button"><i className="tf tf-screen" /> 全屏</a>
                </li>
                <li className="disabled"  >
                    <a role="button"><i className="tf tf-voice-fill" /> 声音</a>
                </li>
                <li role="presentation" className="divider" />
                <li className="disabled" >
                    <a role="button"><i className="tf tf-info-circle" /> 系统信息 <span className="badge">0</span></a>
                </li>
                <li onClick={showQRcode}>
                    <a role="button"><i className="tf tf-qrcode" /> 二维码</a>
                </li>
                <li>
                    <a role="button" href='http://www.strongsoft.net/DMenu.aspx' target='_blank'><i className="tf tf-dolphin" /> 福建四创软件</a>
                </li>

            </ul>
        );
    }
}
