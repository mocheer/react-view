/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
//TODO action
//divider 分割
export default class ComboBox extends Component {
    constructor(props) {
        super(props);
        let { dataProvider } = props,
            selIndex = props.selIndex || (dataProvider && dataProvider.length > 0 && 0),
            selItem = props.selItem || (selIndex >= 0 && dataProvider[selIndex])
        this.state = {
            dataProvider: dataProvider,
            selItem: selItem,
            selIndex: selIndex,
            opened: props.opened
        }
    }
    /**
     * 
     * @param {*} nextProps 
     * @param {*} nextState 
     */
    shouldComponentUpdate(nextProps, nextState) {
        let { selItem, selIndex } = nextState;
        if (selItem !== void 0 || selIndex !== void 0) {
            if (!selItem === void 0) {
                nextState.selItem = this.dataProvider[selIndex];
            }
            if (selIndex === void 0) {
                nextState.selIndex = this.dataProvider.indexOf(selItem)
            }
            return true
        }
    }
    /**
     * 点击事件派发
     * @param {*} event 
     */
    handleClick(event) {
        let opened = !this.state.opened
        this.setState({ opened: opened });
        // if(opened){
        //     let hide = (e)=>{
        //         console.log(opened)
        //         window.removeEventListener('click',hide)
        //         this.setState({ opened:false });
        //     }
        //     window.addEventListener('click',hide)
        // }
    }
    /**
     * 点击列表事件派发
     * @param {*} event 
     * @param {*} index 
     */
    handleChange(event, index) {
        let { props, state } = this,
            { dataProvider } = this.state,
            selItem = dataProvider[index],
            { onClick } = props;
        onClick && onClick(selItem)
        this.setState({ opened: false, selIndex: index, selItem: selItem });
    }
    /**
     * 创建文本
     * @param {*} data 
     */
    createLabel(data) {
        if (typeof (data) === "object") {
            return data.label;
        } else {
            return data;
        }
    }
    /**
     * 创建图标
     * @param {*} data 
     */
    createI(data) {
        if (data.i) {
            return <i className={data.i} />
        }
    }
    /**
     * 渲染
     */
    render() {
        var { props, state, createLabel, createI, handleClick, handleChange } = this;
        var { type } = props;
        var { opened, dataProvider, selIndex, selItem } = state;
        var label = createLabel(selItem);
        var dataList;
        handleClick = handleClick.bind(this);
        if (opened) {
            var dataRows = dataProvider.map((data, index) => {
                var i = createI(data)
                var dataLabel = createLabel(data);
                var liClass = classNames({
                    active: selIndex === index,
                    disabled: data.disabled
                })
                return (
                    <li className={liClass} key={index} onClick={handleChange.bind(this, event, index)}  >
                        <a role="button"> {i} {dataLabel}</a>
                    </li>)
            });
            dataList = <ul className="dropdown-menu" style={{ "min-width": 70, "max-height": 320, "overflow-y": "scroll" }} >{dataRows}</ul>;//160
        }
        var dropClass = classNames(type, { open: opened }, "ComboBox");
        //var btnClass = classNames("btn","btn-default","dropdown-toggle");
        var btnClass = classNames("dropdown-toggle");
        //为了适应 nav ,这里不用div+button的方式
        return (
            <li className={dropClass}>
                <a className={btnClass} role='button' onClick={handleClick} >
                    {label} <span className="caret"></span>
                </a>
                {dataList}
            </li>
        );
    }
}
//设置默认属性
ComboBox.defaultProps = {
    selectedIndex: -1,
    dataProvider: [],
    opened: false,
    type: "dropdown"//dropup
};