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
import AdvancedDataTable from '../../components/AdvancedDataTable'
//
import TyphoonPlayer from './TyphoonPlayer'
import TyphoonInfoBox from './TyphoonInfoBox'
//
import { actions } from '../../ReactActions';
import { stores } from '../../ReactStores';
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
            tfYears:T.Clock.getYears(1945).reverse()
        }
        //
        //
        T.on('timechange', info => {
            var { typhoonLayer } = this.store,
                { index, data } = info,
                { ljtab, ljxx } = this.refs;
            if (data) {
                if (typhoonLayer) {
                    var typhoon = typhoonLayer.getTyphoon(data.tfbh)
                    typhoon && typhoon.setIndex(index)
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
            { config } = props;
        //
        if (!store.player && !store.infobox) {
            store.player = T.render('typhoonplayer', <TyphoonPlayer width={T('mapbox').clientWidth} onCloudChange={this.onCloudChange.bind(this)} onRadarChange={this.onRadarChange.bind(this)} />)
            store.infobox = T.render('mapbox.typhooninfobox', <TyphoonInfoBox />)
            T.set('mapbox.typhooninfobox', {
                position: 'absolute',
                zIndex: 999,
                left: '0px',
                top: config.info.top
            })
        }
        //
        this.handleSubmit()
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
            { config } = props,
            { tflist, cscj ,tfYears} = refs,
            { dataHandler } = config;
        this.handleTyphoon()
        T.getJSON(dataHandler.city, null, result => {
            result = store.cityies = result.data;
            var addPoints = Layer => {
                var layer = store.commonLayer || (store.commonLayer = new Layer());
                if (store.suspended) {
                    layer.suspend()
                }
                result.forEach(item => {
                    item.geometry = [item.mapx, item.mapy]
                    item.label = { name: item.featurename, minZoom: 15 }
                }, this);
                layer.addTo(T.map)
                let {style} = config,
                    {city} = style;
                if(city){
                   layer.addPictures(result,city)
                }else{
                   layer.addPoints(result)
                }
            }
            this.updateCityies()
            T.require(['map/layer/CommonLayer'], addPoints)
        });
        T.getJSON(dataHandler.tfYears,null,result=>{
            result = store.tfYears = result.data;
            tfYears.setState({dataProvider:result,selIndex:0,selItem:result[0]});
        })
    }
    handleTyphoon(data){
        let { refs,  props } = this,
            { config } = props,
            { tflist } = refs,
            { dataHandler } = config,
            sendData = data?{year:data}:null
        T.getJSON(dataHandler.typhoon, sendData, (result) => {
            result = result.data
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
                        geometry,
                        cgeo;
                    if (index === void 0) {
                        index = points.length - 1
                    }
                    if (index >= 0) {
                        var item = points[index]
                        geometry = [item.lng, item.lat];
                    }
                    cityies.forEach(item => {
                        cgeo = [item.mapx, item.mapy];
                        let distance = T.map.measure(geometry, cgeo) * 0.001,
                            label = item.label || (item.label = {})
                        item.distance = distance.toFixed(0);
                        label.name = data.name + '距' + item.featurename + item.distance + '公里'
                    }, this);
                    cscj.setState({ dataProvider: cityies })
                }
            } else {
                cityies.forEach(item => {
                    item.distance = '';
                    item.label.name = item.featurename
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
            { config } = props,
            { ljtab, ljxx } = refs,
            tf = selItems[selItems.length - 1] || null, //当前要显示的台风
            { typhoonLayer } = store,
            { dataHandler } = config;
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
                T.getJSON(dataHandler.lslj + '&tfbh=' + tfbh, null, result => {
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
                    var addTyphoons = TyphoonLayer => {
                        if (!typhoonLayer) {
                            typhoonLayer = store.typhoonLayer = new TyphoonLayer(config);
                            typhoonLayer.addTo(T.map);
                        }
                        if (store.suspended) {
                            typhoonLayer.suspend()
                        }
                        typhoonLayer.addTyphoons(result)
                        this.updateCityies()
                    }
                    T.require(['map/layer/TyphoonLayer'], addTyphoons)
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
            typhoon.setIndex(index)
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
        let { store } = this,
            layerName = type + 'Layer',
            markerName = type + 'Marker'
        if (selected && data) {
            var clock = T.clock(data.time),
                source = T.fmt('data/{0}/{1.fmt.YYYYMM}/{1.fmt.DD}/{1.fmt.YYYYMMDDhhmmss}.png', [type, clock])
            if (store[markerName]) {
                store[markerName].render();
                store[markerName].setStyle({ url: source })
                store[markerName].show();
            } else {
                var add = Layer => {
                    var layer = store[layerName] || (store[layerName] = new Layer()),
                        // geometry = [[106.02, 53.98], [153.94, 6.06]]
                        geometry = [[90, 50], [178, 0]]
                    if (store.suspended) {
                        layer.suspend()
                    }
                    layer.addTo(T.map)
                    store[markerName] = layer.addImg({ geometry: geometry }, { url: source })
                }
                T.require(['map/layer/CommonLayer'], add)
            }
        } else if (store[markerName]) {
            store[markerName].remove();
        }
    }

    render() {
        var { props, onTyphoonItemCheck, onLsljClick, onTyphoonClick, onLsljOver, onCityClick, onLsljOut,handleTyphoon } = this,
            { height } = props,
            h = height / 3
        return (
            <div className='ModuleBox' >
                <NavTab height={h} >
                    <Group label={'台风列表'}>
                        <div height={20}>
                            <span style={{margin:6}}>{'年份:'}</span>
                            <Combobox ref="tfYears" dataProvider={this.store.tfYears} onClick={handleTyphoon.bind(this)} />
                        </div>
                        <AdvancedDataTable ref='tflist' label={'台风列表'} onItemClick={onTyphoonClick.bind(this)} store={stores.advanceddatatable} actions={actions.advanceddatatable} columns={[
                            { f: "check", style: { width: 36, textAlign: "center" }, onChange: onTyphoonItemCheck.bind(this) },
                            { dataField: "tfbh", headerText: "编号" },
                            { dataField: "name", headerText: "中文名" },
                            { dataField: "ename", headerText: "英文名" },
                        ]} />
                    </Group>
                </NavTab>
                <NavTab ref='ljtab' height={h} >
                    <AdvancedDataTable ref='ljxx' reverse={true} showNoData={true} label={'路径信息'} onItemClick={onLsljClick.bind(this)} onTableOut={onLsljOut.bind(this)} onItemOver={onLsljOver.bind(this)} store={stores.advanceddatatable} actions={actions.advanceddatatable} columns={[
                        { dataField: "time", headerText: "时间", style: { width: 128 } },
                        { dataField: "power", headerText: "风力(级)", style: { textAlign: "center" } },
                        { dataField: "speed", headerText: "风速(m/s)", style: { textAlign: "right" } },
                    ]} />
                </NavTab>
                <NavTab height={h} >
                    <AdvancedDataTable ref='cscj' label={'城市测距'} onItemClick={onCityClick.bind(this)} store={stores.advanceddatatable} actions={actions.advanceddatatable} columns={[
                        { dataField: "featurename", headerText: "沿海城市", style: { textAlign: "center" } },
                        { dataField: "distance", headerText: "距离(km)", style: { textAlign: "center" } },
                    ]} />
                </NavTab>
            </div >
        )
    }
}