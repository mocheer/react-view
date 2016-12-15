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

    onItemOver(e) {
        for (let i = 0, menuitem; ; i++) {
            menuitem = this.refs[i]
            if (!menuitem) {
                return;
            }
            if (e.target === menuitem) {
                this.setState({ selIndex: i })
            }
        }
    }

    onZoomIn(e) {
        let {mapbox} = this.props;
        mapbox.zoomBy(1)
    }

    onZoomOut(e) {
        let {mapbox} = this.props;
        mapbox.zoomBy(-1)
    }

    onPan(e) {
        let {mapbox} = this.props,
            {map} = mapbox,
            ScreenPoint = esri.geometry.ScreenPoint,
            point = map.toMap(new ScreenPoint(e.clientX, e.clientY))
        map.centerAt(point)
    }

    showQRcode() {
        let {mapbox} = this.props,
            w = mapbox.box.clientWidth,
            h = mapbox.box.clientHeight,
            outter = {
                position: 'fixed',
                margin:'auto',
                top: 0,
                left: 0,
                bottom:0,
                right:0,
                backgroundColor:'rgba(119,119,119,0.5)'
            },
            inner = {
                position: 'absolute',
                top: h*0.5-128,
                left: w*0.5-256,
                width:280,
                height:280,
                padding:12,
                backgroundColor:'#FFF'
            },
            onClick = ()=>{
                this.setState({render:null})
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
     */
    createItem(data) {
        let itemProps = {},
            children = [],
            label;
        itemProps.className = classNames('list-group-item',{active:data.active});
        //字形
        data.i && children.push(<i className={data.i} />)
        //文本
        if(data.link){
            label = <a href={data.link} target='_blank'> {data.label}</a>
        }else{
            label = data.label;
            itemProps.onMouseOver = data.onMouseOver;
            itemProps.onClick = data.onMouseonClickOver;
        }
        children.push(label)
        //
        return <li {...itemProps} >{children}</li>
    }

    render() {
        let {state} = this,
            {render, selIndex, point,dataProvider} = state;
        if (!point ) {//|| !dataProvider
            return null;
        }
        if (render) {
            return render;
        }
        let styl = {
            position: 'absolute',
            left: point[0] + 12,
            top: point[1] + 12,
            width: 200
        },  content = [],
            {createItem} = this,
            onItemOver = this.onItemOver.bind(this),
            onZoomIn = this.onZoomIn.bind(this),
            onZoomOut = this.onZoomOut.bind(this),
            onPan = this.onPan.bind(this),
            showQRcode = this.showQRcode.bind(this)
        //
        // for(let i=0,l=dataProvider.length,item;i<l;i++){
            
        // }
        //
        //   <li ref='4' className={"list-group-item" + (4 === selIndex ? ' active' : '')} onMouseOver={onItemOver} onClick={showQRcode}>
        //             <i className="fa fa-qrcode" /> 二维码</li>
        return (
            <ul className="list-group ContextMenu" style={styl}>
                <li ref='0' className={"list-group-item" + (0 === selIndex ? ' active' : '')} onMouseOver={onItemOver} onClick={onZoomIn}>
                    <i className="fa fa-search-plus" /> 放大</li>
                <li ref='1' className={"list-group-item" + (1 === selIndex ? ' active' : '')} onMouseOver={onItemOver} onClick={onZoomOut}>
                    <i className="fa fa-search-minus" /> 缩小</li>
                <li ref='2' className={"list-group-item" + (2 === selIndex ? ' active' : '')} onMouseOver={onItemOver} onClick={onPan}>
                    <i className="fa fa-arrows" /> 定位</li>
                <li ref='3' className={"list-group-item" + (3 === selIndex ? ' active' : '')} onMouseOver={onItemOver}  >
                    <i className="fa fa-expand" /> 全屏</li>
              
                <li ref='4' className={"list-group-item disabled" + (5 === selIndex ? ' active' : '')}  >
                    <i className="fa fa-volume-up" /> 声音</li>
                <li ref='5' className={"list-group-item disabled "} onMouseOver={onItemOver}>
                    <i className="fa fa-info-circle" /> 系统信息
                    <span className="badge">0</span>
                </li>
                <li ref='6' className="list-group-item" onMouseOver={onItemOver}>
                    <i className="fa fa-copyright" />
                    <a href='http://www.strongsoft.net/DMenu.aspx' target='_blank'> 福建四创软件</a>
                </li>
                <li ref='7' className="list-group-item " >
                    <i className="fa fa-envelope" /> mocheer@foxmail.com
                </li>
            </ul>
        );
    }
}
