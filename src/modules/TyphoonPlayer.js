import React, { Component, PropTypes } from 'react'
import Toggle from '../components/Toggle'
import CheckBox from '../components/CheckBox'
import classNames from 'classnames'
//时间滑块=>基于台风数据进行解析
export default class TyphoonPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suspended: false,
            width: props.width,
            expanded: props.expanded,
            dataProvider: props.dataProvider,
            selItem: props.selItem || (props.dataProvider && props.dataProvider[props.dataProvider.length - 1]),
            scales: {},
            cloud: false,
            radar: false,
        };
        T.on('moduleexpand', data => {
            this.setState({ width: T('mapbox').clientWidth })
        })
    }
    expand() {
        this.setState({ expanded: true })
    }

    collpase() {
        this.setState({ expanded: false })
    }

    componentDidMount() {
        this.drawScale()
    }

    componentDidUpdate() {
        this.drawScale()
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {state} = this,
            update = nextState.suspended !== state.suspended || nextState.dataProvider !== state.dataProvider || nextState.expanded !== state.expanded || nextState.width !== state.width
        if (!update && state.expanded && state.selItem !== nextState.selItem) {
            nextState.index = nextState.dataProvider.indexOf(nextState.selItem)
            this.drawTimeTrack(nextState.selItem)
        }
        if (update) {
            //update===true 重置
            if (!nextState.selItem || nextState.selItem === state.selItem) {
                nextState.selItem = null;
            }
            nextState.scales = {}
        }
        T.emit('timechange', nextState)
        return update;
    }
    /**
     * 绘制刻度
     */
    drawScale() {
        let {state, refs} = this,
            {dataProvider, scales} = state,
            canvas = refs.scale
        if (canvas) {
            let {width, height} = canvas,
                ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height)
            //
            if (dataProvider) {
                let {getTime} = this,
                    start = dataProvider[0] && getTime(dataProvider[0].time),
                    end = dataProvider[1] && getTime(dataProvider[dataProvider.length - 1].time),
                    duration = (end.getTime() - start.getTime()), //台风总时长
                    maxNum = width * 0.01,
                    num = maxNum, //刻度数量
                    w = width - 60,//左边 30 padding，右边 30 padding
                    step = 3600000 //60*60*1000=3600000 1小时时长 每个刻度
                if (duration < maxNum * step) {
                    num = parseInt(duration / step);
                } else {
                    step = (parseInt(duration / maxNum / step) + 1) * step
                }
                //drawing scale
                let mx = w / num,
                    cs = 30,
                    cx = cs,
                    ct = new Date(start.getTime())
                //
                ctx.lineWidth = 0.5;
                ctx.textAlign = 'center'
                ctx.beginPath();
                if (num < maxNum) {
                    num++
                }
                //
                for (let i = 0; i < num; i++) {
                    //
                    ctx.strokeStyle = '#FFFFFF'
                    ctx.strokeText(ct.getHours() + "时", cx, 10);
                    ctx.strokeText(ct.getMonth() + 1 + "月" + ct.getDate() + "日", cx, 55);
                    ctx.strokeStyle = '#000000'
                    ctx.moveTo(cx, 15)
                    ctx.lineTo(cx, 24)
                    ctx.moveTo(cx, 35)
                    ctx.lineTo(cx, 42)
                    ctx.stroke();
                    //
                    ct.setTime(ct.getTime() + step)
                    cx += mx;
                }
                //save time scale
                //
                duration = step * num;
                for (let i = 0, l = dataProvider.length, item; i < l; i++) {
                    item = dataProvider[i];
                    ct = getTime(item.time)
                    cx = cs + w * (ct.getTime() - start.getTime()) / duration
                    scales[cx] = item;// 28-33
                }
                ctx.stroke();
            }
        }
        this.drawTimeTrack()
    }
    /**
     * 绘制时间进度
     */
    drawTimeTrack(nextItem) {
        let {state, refs} = this,
            {dataProvider, scales} = state,
            canvas = refs.track
        if (canvas) {
            let {width, height} = canvas,
                selItem = state.selItem = nextItem || state.selItem || (dataProvider && dataProvider[dataProvider.length - 1]),
                ctx = canvas.getContext('2d'),
                img = new Image(),
                w = 30
            this.onCloudChange();
            this.onRadarChange();
            img.src = "libs/assets/timeslider/pointer.png"
            img.onload = () => {
                ctx.clearRect(0, 0, width, height)
                if (selItem) {
                    for (let key in scales) {
                        if (scales[key] === selItem) {
                            w = key
                            break;
                        }
                    }
                }
                //光晕
                ctx.shadowColor = "#FAE200";
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 2;
                //右侧空白进度
                ctx.beginPath()
                ctx.moveTo(w, 5)
                ctx.lineTo(width - 10, 5)
                ctx.bezierCurveTo(width - 10, 5, width, 7, width - 8, 13) //右半圆
                ctx.lineTo(w, 13)
                ctx.fillStyle = "#002343"
                ctx.fill()
                //当前进度
                ctx.beginPath()
                ctx.bezierCurveTo(5, 13, 0, 7, 5, 5) //左半圆
                ctx.lineTo(w - 5, 5)
                ctx.lineTo(w - 5, 13)
                ctx.lineTo(5, 13)
                //
                let gradient = ctx.createLinearGradient(0, 5, 0, 13)
                gradient.addColorStop(0, "#FFD633");
                gradient.addColorStop(1, "#E57E18");
                ctx.fillStyle = gradient//"#F7BC2B"
                ctx.fill()
                ctx.drawImage(img, w - 8, 2);

                // 数据时间刻度
                ctx.lineWidth = 3
                ctx.strokeStyle = '#FFFFFF'
                ctx.beginPath();
                for (let key in scales) {
                    if (scales.hasOwnProperty(key)) {
                        if (key !== w) {
                            ctx.moveTo(key, 7)
                            ctx.lineTo(key, 13)
                        }
                    }
                }
                ctx.stroke()
                //
                ctx.closePath()
            }

        }
    }
    /**
     * 进度点击
     */
    onTrackClick(e) {
        let {state} = this,
            {dataProvider, scales, selItem} = state;
        if (dataProvider && scales) {
            let canvas = e.target,
                width = canvas.width - 60,
                clientX = e.clientX,
                cx = clientX - 60,
                min = width, //最接近cx的值
                cmin,
                nextItem
            for (let key in scales) {
                if (scales.hasOwnProperty(key)) {
                    key = parseFloat(key)
                    cmin = Math.abs(key - cx)
                    if (min > cmin) {
                        min = cmin
                        nextItem = scales[key]
                    }
                }
            }
            if (selItem !== nextItem) {
                this.setState({
                    index: dataProvider.indexOf(nextItem),
                    selItem: nextItem
                })
            }
        }
    }
    /**
     * 播放
     */
    onPlayClick(flag) {
        if (flag === 1 || flag === -1) {
            let {state} = this,
                {dataProvider, selItem} = state,
                selIndex = dataProvider.indexOf(selItem) + 1
            if (selIndex >= 0) {
                if (flag === 1 && selIndex > dataProvider.length - 1) {
                    selIndex = 0;
                }
                let {refs} = this,
                    { playButton } = refs
                if (selIndex < dataProvider.length) {
                    this.setState({
                        index: selIndex,
                        selItem: dataProvider[selIndex]
                    })
                    setTimeout(() => {
                        if (playButton.state.selIndex === 1) {
                            this.onPlayClick(-1)
                        }
                    }, 400)
                } else {
                    if (playButton.state.selIndex === 1) {
                        playButton.onClick()
                    }
                }
            }
        }
    }

    onCloudChange(data) {
        let {props, state} = this,
            {selItem} = state;
        if (data && data.selected !== state.cloud) {
            state.cloud = data.selected
        }
        props.onCloudChange && props.onCloudChange(state.cloud,selItem)

    }

    onRadarChange(data) {
        let {props, state} = this,
            {selItem} = state;
        if (data && data.selected !== state.radar) {
            state.radar = data.selected
        }
        props.onRadarChange && props.onRadarChange(state.radar,selItem)
    }

    /**
     * 
     */
    getTime(t) {
        let ps = t.split(" "),
            pd = ps[0].split("-"),
            pt = ps.length > 1 ? ps[1].split(":") : [0, 0, 0];
        return new Date(pd[0], pd[1] - 1, pd[2], pt[0], pt[1], pt[2]);
    }

    render() {
        let {props, state} = this,
            {suspended, tag, expanded} = state,
            width = state.width || 999,
            legendbox = T('legendbox');
        if (suspended) {
            legendbox && (legendbox.style.bottom = '25px')
            return null;
        }
        let box = []
        props.onCloudChange && box.push(<CheckBox label='卫星云图' selected={state.cloud} style={{ color: '#FFFFFF' }} onChange={this.onCloudChange.bind(this)} />)
        props.onRadarChange && box.push(<CheckBox label='气象雷达' selected={state.radar}  style={{ color: '#FFFFFF' }} onChange={this.onRadarChange.bind(this)} />)

        if (!expanded) {
            legendbox && (legendbox.style.bottom = '75px')
            return <img className="TimeSlider" style={{ cursor: 'pointer', left: 5, bottom: 20 }} src="libs/assets/timeslider/collpase.png" onClick={this.expand.bind(this)} />
        }
        legendbox && (legendbox.style.bottom = '105px')
        return (
            <div className="TimeSlider" >
                <div onClick={this.collpase.bind(this)}>
                    <img src="libs/assets/timeslider/title-bg.png" />
                    <img style={{ width: width - 122, height: 34 }} src="libs/assets/timeslider/bar-top.png" />
                    <span style={{ cursor: 'pointer', position: "absolute", left: 35, top: 10, color: '#FFFFFF' }}   >台风播放</span>
                </div>
                <div>
                    <img style={{ width: width - 5, height: 75 }} src="libs/assets/timeslider/bar-middle.png" />
                    <img style={{ position: "absolute", width: 5, height: 104, top: 6 }} src="libs/assets/timeslider/bar-right.png" />
                </div>

                <div style={{ position: "absolute", left: 5, top: 42 }}>
                    <Toggle ref="playButton" dataProvider={['libs/assets/timeslider/play.png', 'libs/assets/timeslider/pause.png']} onClick={this.onPlayClick.bind(this)} />
                    <canvas ref="scale" style={{ position: "absolute", left: 56, top: 0 }} width={width - 70} height={60} />
                    <canvas ref="track" onClick={this.onTrackClick.bind(this)} style={{ cursor: 'pointer', position: "absolute", left: 56, top: 20 }} width={width - 70} height={16} />
                </div>

                <div style={{ position: 'absolute', padding: '5px 0px', right: -4, top: 0, backgroundColor: '#16385B', borderBottomLeftRadius: 2, borderBottomRightRadius: 2, borderTopLeftRadius: 2, borderTopRightRadius: 2 }} >
                    {box}
                </div>
            </div>
        )
    }
}
