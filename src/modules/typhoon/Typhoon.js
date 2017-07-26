/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.4.11
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
//
import NavTab from '../../containers/NavTab'
import Group from '../../containers/Group'
import Combobox from '../../components/Combobox'
import DataTable from '../../components/DataTable'
//
import TyphoonPlayer from './TyphoonPlayer'
import TyphoonInfoBox from './TyphoonInfoBox'
//
export default class Typhoon extends Component {

    constructor(props) {
        super(props);
        this.store = {
            suspended: false,
            map: null,
            commonLayer: null,
            typhoonLayer: null,
            cityies: null,
            selItems: null,
            tfbh: "",
            tflist: {} //{1945:[]}
        }
        //
        T.on('timechange', info => {
            var { typhoonLayer,suspended } = this.store,
                { index, data } = info,
                { ljtab, ljxx } = this.refs;
            if(suspended)return;
            if (data) {
                if (typhoonLayer) {
                    var typhoon = typhoonLayer.getTyphoon(data.tfbh)
                    typhoon && typhoon.setTimeIndex(index)
                    ljtab.setState({ label: data.tfbh + data.name + '路径信息' })
                    ljxx.setState({ selIndex: index, dataProvider: data.points })
                    this.updateCityies(index)
                }
            } else {
                ljtab.setState({ label: '路径信息' })
                ljxx.setState({ dataProvider: null })
            }
        })
    }
    /**
     * 挂载
     */
    componentDidMount() {
        let { props, store, } = this,
            { conf } = props;
        //
        if (!store.player && !store.infobox) {
            store.player = T.render('typhoonplayer', <TyphoonPlayer width={T('tmap').clientWidth} onCloudChange={this.onCloudChange.bind(this)} onRadarChange={this.onRadarChange.bind(this)} />)
            store.infobox = T.render('tmap.typhooninfobox', <TyphoonInfoBox />)
            T.setStyle(T('tmap.typhooninfobox'), {
                position: 'absolute',
                zIndex: 999,
                left: '0px',
                top: conf.info.top
            })
        }
        let { typhoonLayer } = store;
        if (!typhoonLayer) {
            var TyphoonLayer = T.Map.TyphoonLayer;
            typhoonLayer = store.typhoonLayer = new TyphoonLayer(conf);
            typhoonLayer.addTo(T.map);
        }
        if (store.suspended) {
            typhoonLayer.suspend()
        }
        //
        this.handleSubmit()
    }
    /**
     * 
     */
    componentWillUnmount(){
        this.suspend();
        return true
    }
    
    /**
     * 挂起
     */
    suspend() {
        let { store } = this,
            { commonLayer, typhoonLayer, cloudLayer, radarLayer, player, infobox } = store;
        store.suspended = true
        commonLayer && commonLayer.suspend()
        typhoonLayer && typhoonLayer.suspend();
        cloudLayer && cloudLayer.suspend();
        radarLayer && radarLayer.suspend();
        infobox && infobox.suspend();
        player.setState({ suspended: true })
    }
    /**
     * 重启
     */
    resume() {
        let { store } = this,
            { commonLayer, typhoonLayer, cloudLayer, radarLayer, player, infobox } = store
        store.suspended = false
        commonLayer && commonLayer.resume()
        typhoonLayer && typhoonLayer.resume();
        cloudLayer && cloudLayer.resume();
        radarLayer && radarLayer.resume();
        infobox && infobox.resume();
        player.setState({ suspended: false })
    }
    /**
     * 
     * @param {*} event 
     * @param {*} params 
     */
    handleSubmit(event, params) {
        let { refs, store, props } = this,
            { conf } = props,
            { urls } = conf,
            { tflist, cscj, tfYears } = refs;

        this.handleTyphoon()
        T.getJSON(urls.city, null, result => {
            result = store.cityies = result.data;
            var Layer = T.Map.CommonLayer;
            var layer = store.commonLayer || (store.commonLayer = new Layer());
            if (store.suspended) {
                layer.suspend()
            }
            result.forEach(item => {
                item.coordinates = [item.mapx, item.mapy]
                item.tooltip = { text: item.featurename, minZoom: 5 }
            }, this);
            layer.addTo(T.map)
            let { style } = conf,
                { city } = style;
            if (city) {
                city.tooltip = {//leaflet
                    text: function (marker) {
                        let data = marker._d;
                        return (data && data.tooltip.text) || '';
                    }
                }
                layer.addPictures(result, city)
            } else {
                layer.addPoints(result)
            }
            this.updateCityies()
        });
        if (urls.tfYears) {
            T.getJSON(urls.tfYears, null, result => {
                result = result.data;
                tfYears.setState({ dataProvider: result });
            })
        }
    }
    //台风列表
    handleTyphoon(data) {
        let { refs, props, store } = this,
            { tflist, tfYears } = refs,
            year = data;
        if (year) {
            let dataProvider = store.tflist[year]
            if (dataProvider) {
                tflist.setState({ dataProvider: dataProvider })
                return;
            }
        }
        let { conf } = props,
            { urls } = conf,
            sendData = year ? { year: year } : null
        // 当前年份台风
        T.getJSON(urls.typhoon, sendData, result => {
            result = result.data
            if (!urls.tfYears && !tfYears.state.dataProvider) {
                year = result[0].tfbh.slice(0, 4)
                tfYears.setState({ dataProvider: T.Clock.getYears(1945, year).reverse() });
            }
            for (let i = 0, l = result.length, selItems = [], item; i < l; i++) {
                item = result[i];
                if (item.is_current === true) {
                    selItems.push(item)
                    item.checked = true;
                    this.onTyphoonItemCheck(item, null, selItems)
                }
            }
            store.tflist[year] = result;
            tflist.setState({ dataProvider: result })
        });
    }
    /**
     * 更新城市距离
     */
    updateCityies(index) {
        let { refs, store } = this,
            { cscj } = refs,
            { cityies, tfbh, typhoonLayer } = store
        if (cityies && typhoonLayer) {
            if (tfbh !== '') {
                var typhoon = typhoonLayer.getTyphoon(tfbh);
                if (typhoon) {
                    var data = typhoon.data,
                        points = data.points || [],
                        coordinates,
                        cgeo;
                    if (index === void 0) {
                        index = points.length - 1
                    }
                    if (index >= 0) {
                        var item = points[index]
                        coordinates = [item.lng, item.lat];
                    }
                    cityies.forEach(item => {
                        cgeo = [item.mapx, item.mapy];
                        let distance = T.map.distance(coordinates, cgeo) * 0.001,
                            tooltip = item.tooltip || (item.tooltip = {})
                        item.distance = distance.toFixed(0);
                        tooltip.text = data.name + '距' + item.featurename + item.distance + '公里' //arcgis
                    }, this);
                    cscj.setState({ dataProvider: cityies })
                }
            } else {
                cityies.forEach(item => {
                    item.distance = '';
                    item.tooltip.text = item.featurename
                }, this);
                cscj.setState({ dataProvider: cityies })
            }
        } else {
            cscj.setState({ dataProvider: cityies })//result.typhoon_config.typhoon_city
        }
    }
    /**
     * 
     * @param {*} tf 
     */
    addSliderTime(tf) {
        let { player } = this.store,
            dataProvider = tf && tf.lslj.data[0].points,
            data = tf && tf.lslj.data[0];
        player.setState({ expanded: true, data: data, dataProvider: dataProvider })
    }
    /**
     * 
     * @param {*} data 
     * @param {*} column 
     * @param {*} selItems 
     */
    onTyphoonItemCheck(data, column, selItems) {
        let { refs, store, props } = this,
            { conf } = props,
            { ljtab, ljxx } = refs,
            tf = selItems[selItems.length - 1] || null, //当前要显示的台风
            { typhoonLayer } = store,
            { urls } = conf;
        store.selItems = selItems;
        if (tf) {
            var tfbh = store.tfbh = tf.tfbh
            if (tf.lslj) {//已缓存
                typhoonLayer.addTyphoons(tf.lslj.data)
                this.addSliderTime(tf)
                let points = tf.lslj.data[0].points;
                ljxx.setState({ dataProvider: points, selIndex: -1 })
                ljtab.setState({ label: tf.tfbh + tf.name + '路径信息' })
                this.updateCityies()
            } else {     //未缓存
                T.getJSON(urls.lslj + '&tfbh=' + tfbh, null, result => {
                    tf.lslj = result;
                    if (store.selItems && store.selItems.indexOf(tf) === -1) {
                        return;
                    }
                    result = result.data
                    let points = result[0].points;
                    if (points) {
                        points.forEach(item => {
                            item.time = item.time.replace('T', ' ')
                        }, this);
                    }
                    this.addSliderTime(tf)
                    ljxx.setState({ dataProvider: points, selIndex: -1 })
                    ljtab.setState({ label: tf.tfbh + tf.name + '路径信息' })
                    typhoonLayer.addTyphoons(result)
                    this.updateCityies()
                });
            }
        } else {
            store.tfbh = ""
            this.addSliderTime(null)
            ljxx.setState({ dataProvider: [] })
            ljtab.setState({ label: null })
            this.updateCityies()
        }
        if (!data.checked) {
            typhoonLayer.removeTyphoons([data.tfbh])
        }
    }
    /**
     * 切换台风
     * @param {*} info 
     */
    onTyphoonClick(info) {
        if (!info.columnid || info.columnid === 0) {
            return;
        }
        let data = info.data,
            { store, refs } = this,
            { ljtab, ljxx } = refs;
        if (data.checked && data.lslj) {
            store.tfbh = data.tfbh;
            let points = data.lslj.data[0].points;
            this.addSliderTime(data)
            ljxx.setState({ dataProvider: points, selIndex: -1 })
            ljtab.setState({ label: data.tfbh + data.name + '路径信息' })
            this.updateCityies()
        }
    }
    /**
     * 历史路径点击
     * @param {*} info 
     */
    onLsljClick(info) {
        let { store } = this,
            { typhoonLayer, player } = store,
            { index } = info,
            selItem = info.dataProvider[index]
        if (typhoonLayer) {
            var typhoon = typhoonLayer.getTyphoon(store.tfbh)
            typhoon.setTimeIndex(index)
        }
        player.setState({ selItem: selItem })
    }
    /**
     * 历史路径移入
     * @param {*} info 
     */
    onLsljOver(info) {
        let { store } = this,
            { typhoonLayer } = store
        if (typhoonLayer) {
            var typhoon = typhoonLayer.getTyphoon(store.tfbh)
            typhoon.showTip(info.index)
        }
    }
    /**
     * 历史路径移出
     */
    onLsljOut() {
        let { store } = this,
            { typhoonLayer } = store
        typhoonLayer && typhoonLayer.removeTip();
    }

    onCityClick(info) {
        var { data } = info
        T.map.setView([data.mapx, data.mapy], 9)
    }

    onCloudChange(selected, data) {
        this.onImgChange('cloud', selected, data)
    }

    onRadarChange(selected, data) {
        this.onImgChange('radar', selected, data)
    }

    onImgChange(type, selected, data) {
        let { store, props } = this,
            { conf } = props,
            { mapImage } = conf,
            layerName = type + 'Layer',
            markerName = type + 'Marker'
        if (selected && data) {
            var clock = T.clock(data.time),
                source = T.helper.fmt(mapImage.url, [type, clock])
            if (store[markerName]) {
                store[markerName].render();
                store[markerName].setStyle({ url: source })
                store[markerName].show();
            } else {
                var Layer = T.Map.CommonLayer
                var layer = store[layerName] || (store[layerName] = new Layer()),
                    coordinates = mapImage.geometry
                if (store.suspended) {
                    layer.suspend()
                }
                layer.addTo(T.map)
                store[markerName] = layer.addImg({ coordinates: coordinates }, { url: source })
            }
        } else if (store[markerName]) {
            store[markerName].remove();
        }
    }

    render() {
        var { props, onTyphoonItemCheck, onLsljClick, onTyphoonClick, onLsljOver, onCityClick, onLsljOut, handleTyphoon } = this,
            { height } = props,
            h = height / 3
        return (
            <div style={{ paddingLeft: 5, backgroundColor: '#5190E5'}} >
                <NavTab height={h} >
                    <Group label={'台风列表'}>
                        <div height={23}>
                            <span style={{ margin: 5, lineHeight: 1.6, fontSize: 15 }}>{'年份:'}</span>
                            <Combobox ref="tfYears" onClick={handleTyphoon.bind(this)} />
                        </div>
                        <DataTable ref='tflist' label={'台风列表'} onItemClick={onTyphoonClick.bind(this)} columns={[
                            { f: "check", style: { width: 36, textAlign: "center" }, onChange: onTyphoonItemCheck.bind(this) },
                            { dataField: "tfbh", headerText: "编号", style: { textAlign: "center" } },
                            { dataField: "name", headerText: "中文名", style: { textAlign: "center" } },
                            { dataField: "ename", headerText: "英文名", style: { textAlign: "center" } },
                        ]} />
                    </Group>
                </NavTab>
                <NavTab ref='ljtab' height={h} >
                    <DataTable ref='ljxx' reverse={true} showNoData={true} label={'路径信息'} onItemClick={onLsljClick.bind(this)} onTableOut={onLsljOut.bind(this)} onItemOver={onLsljOver.bind(this)} columns={[
                        { dataField: "time", headerText: "时间", style: { width: 128 } },
                        { dataField: "power", headerText: "风力(级)", style: { textAlign: "center" } },
                        { dataField: "speed", headerText: "风速(m/s)", style: { textAlign: "center" } },
                    ]} />
                </NavTab>
                <NavTab height={h} >
                    <DataTable ref='cscj' label={'城市测距'} onItemClick={onCityClick.bind(this)} columns={[
                        { dataField: "featurename", headerText: "沿海城市", style: { textAlign: "center" } },
                        { dataField: "distance", headerText: "距离(km)", style: { textAlign: "center" } },
                    ]} />
                </NavTab>
            </div >
        )
    }
}