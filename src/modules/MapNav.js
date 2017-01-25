import React, { Component, PropTypes } from 'react'
import Navbar from '../containers/Navbar'
import ComboBox from '../components/ComboBox'
/**
 * 
 */
export default class MapNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: T.map && T.map.type
        }
    }

    componentDidMount() {
        window.require(['map/layer/DrawLayer'], function (Layer) {
            new Layer().addTo(T.map)
        })
    }

    /**
     * 
     */
    onProviderClick(data) {
        T.map.setProvider(data.value);
        T.emit('providerchange', data)
    }

    onMouseOver(e) {
        let {target, currentTarget} = e
        if (target !== currentTarget) {
            while (target.parentNode !== currentTarget) {
                target = target.parentNode;
            }
            let dataset = target.dataset,
                {label} = dataset;
            label && T.emit('tooltip', {
                label: label,
                placement: 'bottom',
                target: target,
                style: { top: 48 }
            })
        }
    }
    onClick(e) {
        let {target, currentTarget} = e
        if (target !== currentTarget) {
            while (target.parentNode !== currentTarget) {
                target = target.parentNode;
            }
            let dataset = target.dataset,
                {value} = dataset;
            value && T.map.emit('mapdraw', {
                tool: value
            })

        }
    }
    onMoustOut() {
        T.emit('tooltip', { hide: true })
    }
    /**
     * 
        <a className="btn btn-default" data-label='漫游' role="button">
            <i className="fa fa-hand-paper-o" ></i>
        </a>
     */
    render() {
        let {onProviderClick, props, state} = this,
            title = state.title,
            providers = [
                { label: '谷歌地图', value: 'GoogleMap.Normal', i: 'fa fa-rocket' },
                { label: '谷歌影像图', value: 'GoogleMap.Hybrid', i: "fa fa-map-o" },
                { label: '谷歌地形图', value: 'GoogleMap.Terrain', i: 'fa fa-ambulance' },
                { label: '谷歌地形图+底图', value: 'GoogleMap.Terrain_R', i: 'fa fa-taxi' },
                { label: '谷歌卫星图', value: 'GoogleMap.Satellite', i: 'fa fa-car' },
                { label: '谷歌轮廓图(dark)', value: 'GoogleMap.Skeleton_D', i: 'fa fa-ship' },
                { label: '谷歌轮廓图(light)', value: 'GoogleMap.Skeleton_H', i: 'fa fa-bus' },
                { label: '高德影像图', value: 'GaodeMap.Satellite', i: 'fa fa-train' },
                { label: '高德卫星图', value: 'GaodeMap.Normal', i: 'fa fa-truck' },
                { label: '天地图(卫星)', value: 'Tianditu.Normal', disabled: true, i: 'fa fa-joomla' },
                { label: '天地图(地形)', value: 'Tianditu.Terrain', disabled: true, i: 'fa fa-subway' },
            ]
        return (
            <Navbar >
                <ul className="nav navbar-nav ">
                    <li><a role='button'>{title}</a></li>
                    <ComboBox onClick={onProviderClick} dataProvider={providers} />
                </ul>
                <form className="navbar-form navbar-left">
                    <div className="input-group" style={{ marginRight: 10 }}>
                        <input type="text" className="form-control" placeholder="Search" />
                        <span className="input-group-addon" role='button' ><i className="fa fa-search"></i></span>
                    </div>
                    <div className="btn-group" style={{ marginRight: 10 }} onMouseOver={this.onMouseOver} onClick={this.onClick} onMouseOut={this.onMoustOut} >

                        <a className="btn btn-default" data-label='点选' data-value='pointer' role="button">
                            <i className="fa fa-mouse-pointer" ></i>
                        </a>

                         <a className="btn btn-default" data-label='绘制直线' data-value='polyline' role="button">
                            <i className="fa fa-pencil" ></i>
                        </a>

                        <a className="btn btn-default" data-label='绘制曲线' data-value='curve' role="button">
                            <i className="fa fa-pencil" ></i>
                        </a>
                        <a className="btn btn-default" data-label='填充曲线' data-value='curvefill' role="button">
                            <i className="fa fa-paint-brush" ></i>
                        </a>
                        <a className="btn btn-default" data-label='绘制矩形' data-value='rect' role="button">
                            <i className="fa fa-square-o" ></i>
                        </a>
                        <a className="btn btn-default" data-label='绘制圆形' data-value='circle' role="button">
                            <i className="fa fa-circle-o" ></i>
                        </a>
                        <a className="btn btn-default" data-label='绘制多边形' data-value='polygon' role="button">
                            <i className="fa fa-connectdevelop" ></i>
                        </a>
                        <a className="btn btn-default" data-label='清除回收' data-value='clear' role="button">
                            <i className="fa fa-recycle" ></i>
                        </a>
                    </div>

                    <div className="btn-group" onMouseOver={this.onMouseOver} onMouseOut={this.onMoustOut} >
                        <a className="btn btn-default" data-label='声音' role="button">
                            <i className="fa fa-volume-up" ></i>
                        </a>
                        <a className="btn btn-default" data-label='设置' role="button">
                            <i className="fa fa-cog" ></i>
                        </a>
                    </div>
                </form>

                <ul className="nav navbar-nav navbar-right">
                    <li><a href='http://www.strongsoft.net/DMenu.aspx' target='_blank'>Help</a></li>
                </ul>
            </Navbar>)
    }
}
