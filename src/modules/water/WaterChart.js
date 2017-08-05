/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.8.1
 */
import React, { Component, PropTypes } from 'react'
import TComponent from '../../TComponent'
// import ReactEcharts from 'echarts-for-react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
/**
 * 
 */
export default class WaterChart extends TComponent {
    /**
     * 
     */
    render() {
        var randomData = () => {
            now = new Date(+now + oneDay);
            value = value + Math.random() * 21 - 10;
            return {
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                    Math.round(value)
                ]
            }
        }
        var data = [];
        var now = +new Date(1997, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var value = Math.random() * 1000;
        for (var i = 0; i < 1000; i++) {
            data.push(randomData());
        }

        var option = {
            title: {
                text: '水位过程线'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['水位', '警戒水位', '保证水位'],
                formatter: function (name) {
                    return echarts.format.truncateText(name, 80, '14px Microsoft Yahei', '…');
                },
                tooltip: {
                    show: true
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '水位',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }, {
                name: '警戒水位',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }, {
                name: '保证水位',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }]
        };
        return (
            <div className='shadow' style={{ width: 500, height: 300, margin: 5 }}  >
                <div style={{ textAlign: 'left', height: 33, background: '#1c7be8', borderTop: '4px solid #509ff7', color: '#fff' }} >
                    <label style={{ fontSize: 15, margin: 3 }}>测站名称</label>
                    <img role='button' src='tree/assets/common/btn-close.png' style={{ position: 'absolute', left: 490, top: 20 }} onClick={e => this.do('close')} />
                </div>
                <div style={{ backgroundColor: '#fff' }} >
                    <ReactEchartsCore
                        echarts={echarts}
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"} />
                </div>
            </div>
        )
    }
}