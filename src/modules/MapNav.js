/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
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
            title: '福建四创软件研发二部项目四组-' + T.Map.platform
        }
    }
    /**
     * 
     */
    componentDidMount() {

    }
    /**
     * 
     */
    onProviderClick(data) {
        T.map.setProvider(data.value);
    }
    /**
     * 
     * @param {*} e 
     */
    onMouseOver(e) {
        let { target, currentTarget } = e
        if (target !== currentTarget) {
            while (target.parentNode !== currentTarget) {
                target = target.parentNode;
            }
            let dataset = target.dataset,
                { label } = dataset;
            label && T.do('tooltip', {
                label: label,
                placement: 'bottom',
                target: target,
                style: { top: 48 }
            })
        }
    }
    onClick(e) {
        let { target, currentTarget } = e
        if (target !== currentTarget) {
            while (target.parentNode !== currentTarget) {
                target = target.parentNode;
            }
            let dataset = target.dataset,
                { value } = dataset;
            value && T.map.setTool({ tool: value})
        }
    }
    onMoustOut() {
        T.do('tooltip', { hide: true })
    }
    /**
     * 
        <a className="btn btn-default" data-label='漫游' role="button">
            <i className="tf tf-hand-paper-o" ></i>
        </a>
     */
    render() {
        let { onProviderClick, props, state } = this,
            title = state.title,
            providers = [
                { label: '谷歌地图', value: 'GoogleMap.Normal', i: 'tf tf-rocket' },
                { label: '谷歌影像图', value: 'GoogleMap.Hybrid', i: "tf tf-map-o" },
                { label: '谷歌地形图', value: 'GoogleMap.Terrain', i: 'tf tf-ambulance' },
                { label: '谷歌地形图+底图', value: 'GoogleMap.Terrain_R', i: 'tf tf-taxi' },
                { label: '谷歌卫星图', value: 'GoogleMap.Satellite', i: 'tf tf-car' },
                { label: '谷歌轮廓图(dark)', value: 'GoogleMap.Skeleton_D', i: 'tf tf-ship' },
                { label: '谷歌轮廓图(light)', value: 'GoogleMap.Skeleton_H', i: 'tf tf-bus' },
                { label: '高德影像图', value: 'GaodeMap.Satellite', i: 'tf tf-train' },
                { label: '高德卫星图', value: 'GaodeMap.Normal', i: 'tf tf-truck' },
                { label: '天地图(卫星)', value: 'Tianditu.Normal', disabled: false, i: 'tf tf-joomla' },
                { label: '天地图(地形)', value: 'Tianditu.Terrain', disabled: false, i: 'tf tf-subway' },
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
                        <span className="input-group-addon" role='button' ><i className="tf tf-search"></i></span>
                    </div>
                    <div className="btn-group" style={{ marginRight: 10 }} onMouseOver={this.onMouseOver} onClick={this.onClick} onMouseOut={this.onMoustOut} >

                        <a className="btn btn-default" data-label='点选' data-value='pointer' role="button">
                            <i className="tf tf-mouse-pointer" ></i>
                        </a>

                        <a className="btn btn-default" data-label='图元' data-value='point' role="button">
                            <i className="tf tf-mouse-pointer" ></i>
                        </a>

                        <a className="btn btn-default" data-label='绘制线' data-value='polyline' role="button">
                            <i className="tf tf-draw-line" ></i>
                        </a>

                        <a className="btn btn-default" data-label='绘制曲线' data-value='curve' role="button">
                            <i className="tf tf-draw-curve"  ></i>
                        </a>
                        <a className="btn btn-default" data-label='填充曲线' data-value='curvefill' role="button">
                            <i className="tf tf-draw-curve" ></i>
                        </a>
                        <a className="btn btn-default" data-label='绘制矩形' data-value='rect' role="button">
                            <i className="tf tf-draw-rect" ></i>
                        </a>
                        <a className="btn btn-default" data-label='绘制圆形' data-value='circle' role="button">
                            <i className="tf tf-draw-circle" ></i>
                        </a>
                        <a className="btn btn-default" data-label='绘制多边形' data-value='polygon' role="button">
                            <i className="tf tf-draw-polygon" ></i>
                        </a>

                        <a className="btn btn-default" data-label='贝塞尔曲线' data-value='bezier' role="button">
                            <i className="tf tf-draw-line" ></i>
                        </a>

                        <a className="btn btn-default" data-label='清除回收' data-value='clear' role="button">
                            <i className="tf tf-clear-fill" ></i>
                        </a>
                    </div>

                    <div className="btn-group" onMouseOver={this.onMouseOver} onMouseOut={this.onMoustOut} >
                        <a className="btn btn-default" data-label='声音' role="button">
                            <i className="tf tf-voice-fill" ></i>
                        </a>
                        <a className="btn btn-default" data-label='设置' role="button">
                            <i className="tf tf-setting" ></i>
                        </a>
                    </div>
                </form>

                <ul className="nav navbar-nav navbar-right">
                    <li><a href='http://www.strongsoft.net/DMenu.aspx' target='_blank'>Help</a></li>
                </ul>
            </Navbar>)
    }
}
