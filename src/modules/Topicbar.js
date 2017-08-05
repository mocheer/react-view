/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
import TComponent from '../TComponent'
import CheckBox from '../components/CheckBox'
import ModuleBox from './ModuleBox'
/**
 * 专题栏，菜单选择加载模块
 */
export default class Topicbar extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        let { dataProvider } = props;
        dataProvider = [
            {
                label: '实时监测', children: [
                    { label: '实时水情', icon: 'tree/assets/menu/rain.png', deps: [], props: {} },
                    { label: '实时雨情', icon: 'tree/assets/menu/rain.png', checked: false, deps: [] },
                    { label: '实时风情', icon: 'tree/assets/menu/rain.png' }
                ]
            },
            {
                label: '气象信息', children: [
                    { label: '台风路径', icon: 'tree/assets/menu/rain.png' },
                    { label: '卫星云图', icon: 'tree/assets/menu/rain.png' }
                ]
            },
            {
                label: '气象信息', children: [
                    { label: '台风路径', icon: 'tree/assets/menu/rain.png' },
                    { label: '卫星云图', icon: 'tree/assets/menu/rain.png' },
                    { label: '卫星云图', icon: 'tree/assets/menu/rain.png' }
                ]
            },
            {
                label: '气象信息', children: [
                    { label: '台风路径', icon: 'tree/assets/menu/rain.png' },
                    { label: '卫星云图', icon: 'tree/assets/menu/rain.png' }

                ]
            }
        ]
        let selItems = [];//[dataProvider[0].children[1]]
        dataProvider.forEach(item => {
            item.children && item.children.forEach(item => {
                item.checked && selItems.push(selItems);
            })
        });

        this.state = {
            selItems: selItems,//
            showMenu: false,
            dataProvider: dataProvider
        }
        if (!dataProvider) {
            let { url } = props;
            T.ajax({
                url: url, success: data => {
                    this.setState({ dataProvider: data })
                }
            })
        }
    }
    /**
     * 
     */
    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu })
    }
    /**
     * 加载并显示模块
     */
    onMenuChecked(data) {
        let { selItems } = this.state,
            index = selItems.indexOf(data);
        if (index === -1) {
            data.checked && selItems.push(data);
        } else {
            !data.checked && selItems.splice(index, 1)

        }
        this.setState({})
    }
    /**
     * 
     */
    onItemClick() {
        this.setState({})
    }
    /**
     * 渲染
     */
    render() {
        let { state, toggleMenu, onMenuChecked, onItemClick } = this,
            { dataProvider, selItems, showMenu } = state;
        return (
            <div className='Topicbar' style={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#fff', zIndex: 999 }}>
                <Menu dataProvider={selItems} on={{ addClick: toggleMenu.bind(this), itemClick: onItemClick.bind(this) }} />
                <DataMenu dataProvider={dataProvider} show={showMenu} on={{ change: onMenuChecked.bind(this) }} />
                <ModuleBox dataProvider={selItems} />
            </div>
        )
    }
}
/**
 * 
 */
class Menu extends TComponent {
    constructor(props) {
        super(props);
        let { dataProvider } = props
        this.state = {
            dataProvider: dataProvider,
            selItems: dataProvider || []
        }
    }
    /**
     * 
     * @param {*} e 
     */
    onAddClick(e) {
        this.do('addClick')
    }
    /**
     * 
     */
    createMenu() {
        let { dataProvider } = this.props;
        if (dataProvider) {
            return dataProvider.map(item => {
                let { icon, label } = item,
                    style = { padding: 2 }
                if (!item.suspend) {
                    style.backgroundColor = '#1c7be8'
                }
                return (
                    <div role="button" style={style} onClick={e => {
                        item.suspend = !item.suspend
                        this.do('itemClick')
                    }} >
                        <img src={icon} style={{ padding: '5px 10px' }} />
                        {label}
                    </div>
                )
            })
        }
    }
    /**
     * 渲染
     */
    render() {
        let that = this,
            { onAddClick } = that,
            menus = that.createMenu();
        // chrome 的 fontSize 最小值为12px
        return (
            <div className='MenuBox' style={{ position: 'relative', backgroundColor: '#1c7be8', color: '#fff' }} >
                <div role="button" onClick={onAddClick.bind(that)} style={{ width: 55, height: 55, textAlign: 'center' }}>
                    <i className='tf tf-plus' style={{ fontSize: 24, paddingTop: 12 }} />
                </div>
                <div style={{ width: 55, height: document.body.clientHeight, backgroundColor: '#52a0f8', fontSize: 10 }} >
                    {menus}
                </div>
            </div>
        )
    }
}

/**
 * 数据专题菜单
 */
class DataMenu extends TComponent {
    /**
     * 渲染
     */
    render() {
        let { props } = this,
            { dataProvider, show } = props,
            menus;
        if (!dataProvider || !show) return null;
        menus = dataProvider.map((data, index) => {
            let { label, children } = data;
            if (!children) return null;
            let dataRows = children.map(data => {
                return <CheckBox style={{ display: 'block', margin: '8px 10px' }} label={data.label} icon={data.icon} checked={data.checked} onChange={e => {
                    data.checked = !data.checked;
                    this.do('change', data)
                }} />
            })
            return (
                <div style={{ display: 'inline-block', marginBottom: 5, textAlign: 'center', marginTop: 15, verticalAlign: 'top', color: '#fff', borderRight: '1px solid #509ff7' }}>
                    <label style={{ fontSize: 14, fontWeight: 'normal' }}>{label}</label>
                    {dataRows}
                </div>
            );
        })
        return (
            <div className='DataMenu' style={{ position: 'absolute', top: 0, left: 55, width: 480, backgroundColor: '#1c7be8', zIndex: 9 }}  >
                {menus}
            </div>
        )
    }
}
