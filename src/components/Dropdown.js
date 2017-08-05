/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
//TODO action
//divider 分割
export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        let { dataProvider } = props,
            selIndex = props.selIndex,
            selItem;
        if (dataProvider) {
            if (selIndex == -1) {
                selIndex = 0;
            }
            selItem = dataProvider[selIndex]
        }
        this.state = {
            dataProvider: dataProvider,
            selIndex: selIndex,
            selItem: selItem,
            opened: props.opened
        }
    }
    /**
     * 
     * @param {*} nextProps 
     * @param {*} nextState 
     */
    shouldComponentUpdate(nextProps, nextState) {
        let { selItem, selIndex, dataProvider } = nextState;
        if (selItem !== null || selIndex !== null) {
            dataProvider = dataProvider || this.state.dataProvider;
            if (dataProvider) {
                if (!selItem === void 0) {
                    nextState.selItem = dataProvider[selIndex];
                }
                if (selIndex === void 0) {
                    nextState.selIndex = dataProvider.indexOf(selItem)
                }
                return true
            }
        } else if (dataProvider) {
            nextState.selIndex = 0;
            nextState.selItem = dataProvider[0];
            return true;
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
        if (typeof data == 'object') {
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
        let { props, state, createLabel, createI, handleClick, handleChange } = this,
            { type, mode, style, width } = props,
            { opened, dataProvider, selIndex, selItem } = state,
            dataList
        if (!dataProvider) {
            return null;
        }
        selItem = selItem || dataProvider[0]
        let label = createLabel(selItem);
        handleClick = handleClick.bind(this);
        if (opened) {
            let dataRows = dataProvider.map((data, index) => {
                var i = createI(data)
                var dataLabel = createLabel(data);
                var liClass = classNames({
                    active: selIndex === index,
                    disabled: data.disabled
                })
                return (
                    <li className={liClass} key={index} onClick={handleChange.bind(this, event, index)}  >
                        <a role='button'> {i} {dataLabel}</a>
                    </li>)
            });
            dataList = <ul className='dropdown-menu' style={{ minWidth: 70, maxHeight: 320, overflowY: 'scroll' }} >{dataRows}</ul>;//160
        }
        let caret = <span className='caret'></span>,
            dropClass = classNames(mode, { open: opened }, 'Dropdown'),
            btnClass = classNames('dropdown-toggle', { 'btn btn-default': type === 'button' }),
            btn
        //
        switch (type) {
            case 'button':
                let style = width ? { width: width } : null;
                btn = <button className={btnClass} type="button" onClick={handleClick} style={style} >
                    {label} {caret}
                </button>
                break;
            default:
                btn = <a className={btnClass} role='button' onClick={handleClick} >
                    {label} {caret}
                </a>
                break;
        }
        return (
            <li className={dropClass} style={style}>
                {btn}
                {dataList}
            </li>
        );
    }
}
//设置默认属性
Dropdown.defaultProps = {
    selIndex: -1,
    opened: false,  //是否展开
    // btn: 'text',    // button
    mode: 'dropdown'//dropup 向上/上下展开

};