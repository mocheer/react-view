/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
let defaultProps = {
    opened: false,  //是否展开
    direction: 'dropdown'//dropup 向上/上下展开
};
/**
 * @class Dropdown
 * @property dataProvider {label,val,checked}
 * @property selIndex 
 * @property onChange 
 */
export default class Dropdown extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        let { dataProvider, selIndex } = props,
            selItem;

        selIndex = selIndex || 0;
        if (dataProvider) {
            selItem = T.find(dataProvider, { checked: true }) || dataProvider[selIndex]
        }
        this.state = {
            selIndex: dataProvider ? dataProvider.indexOf(selItem) : -1,
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
        let { hook } = this.props;
        if (hook) {
            return hook.call(this, nextProps, nextState)
        }
        return true;
    }
    /**
     * 点击事件派发
     * @param {*} event 
     */
    handleClick(event) {
        let opened = !this.state.opened
        this.setState({ opened: opened });
        if (opened) {
            let { container } = this.refs,
                hide = e => {
                    let { target } = e,
                        parent = target;
                    while (parent) {
                        if (parent === container) {
                            return;
                        }
                        parent = parent.parentNode;
                    }
                    window.removeEventListener('click', hide)
                    this.setState({ opened: false });
                }
            //需要由于handleChange执行
            //可能dropdown里面还有dropdown
            window.addEventListener('click', hide, true)
        }
    }
    /**
     * 点击列表事件派发
     * @param {*} event 
     * @param {*} index 
     */
    handleChange(event, index) {
        let { props, state } = this,
            { dataProvider } = props,
            selItem = dataProvider[index],
            { onChange } = props;
        let nextState = { opened: false, selIndex: index, selItem: selItem }
        // Object.assign(state,nextState)
        onChange && onChange({ target: this, selItem: selItem, source: dataProvider }); //
        this.setState(nextState);
    }
    /**
     * 创建文本
     * @param {*} data 
     */
    createLabel(data) {
        let label = data;
        if (typeof data == 'object') {
            label = data.label;
        }
        return label
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
     * 
     */
    createPopup(dataProvider) {
        if (dataProvider.length === 0) {
            return null;
        }
        let { props, state, createLabel, createI, handleChange } = this;
        let { type, width } = props;
        let { selIndex, selItem, opened } = state;
        let dataRows = dataProvider.map((data, index) => {
            let i = createI(data)
            let dataLabel = createLabel(data);
            let liClass = classNames({
                active: selIndex === index || selItem === data,
                disabled: data.disabled
            })
            return (
                <li className={liClass} key={index} onClick={handleChange.bind(this, event, index)}  >
                    <a role='button' style={{ padding: '2px 8px' }}>{i}{dataLabel}</a>
                </li>
            )
        });
        this._initPopup = true;
        //跟按钮同宽度
        return (
            <ul className='dropdown-menu'
                style={{ display: opened ? 'block' : 'none', left: type === 'btn' ? 0 : -8, width: width, minWidth: 50, maxHeight: 320, overflowY: dataRows.length > 12 ? 'scroll' : 'auto', marginTop: type === 'btn' ? 10 : 0 }} >
                {dataRows}
            </ul>//160
        )
    }

    /**
     * 渲染
     */
    render() {
        let { props, state, handleClick, createLabel, createPopup } = this,
            { type, direction, style, width, labelFn, render, group, icon, dataProvider } = props,
            { opened, selItem } = state,
            dataList;
        //
        let label = (labelFn ? labelFn(selItem) : createLabel(selItem));
        if (!label) {//默认选中
            if (dataProvider) {
                label = dataProvider[0];
                state.selIndex = 0;
                state.selItem = selItem = label;
            } else {
                label = props.label;
            }
        }

        if (typeof label === 'object') {//第一个数据可能是个object
            label = label.label;
        }
        //
        if (!label) {
            return null;
        }
        render = render || createPopup;

        if (opened) {
            dataList = render.call(this, dataProvider, selItem)
            this._initPopup = true;//用于标识已经初始化Popup
        } else if (selItem && selItem.popup) {//暂时这样做，水情快速时间选择
            opened = true;
            dataList = selItem.popup;
            if (typeof dataList === 'function') {
                dataList = dataList()
            }
        } else if (this._initPopup) {
            dataList = render.call(this, dataProvider, selItem)
        }
        // 
        let caretStyle = { marginTop: 8, float: 'right', marginLeft: 3 };//确保按钮宽度太宽时右对齐
        if (opened) {
            Object.assign(caretStyle, { borderTop: 6, borderBottom: '4px dashed' })
        }
        let caret = <span className='caret' style={caretStyle} />,
            dropClass = classNames(direction, { open: opened }, { 'btn-group': group !== void 0 }, 'Dropdown'),
            btnClass = classNames('dropdown-toggle', { 'btn btn-default': type === 'btn' }),
            btn;
        //
        handleClick = handleClick.bind(this);
        if (icon) {
            icon = <img style={{ height: 18 }} src={icon} />
        }
        switch (type) {
            case 'btn':
                let style = width ? { width: width, textAlign: 'left' } : null;
                btn = (
                    <button className={btnClass} type="button" onClick={handleClick} style={style} >
                        {icon} {label} {caret}
                    </button>
                )
                break;
            default:
                caretStyle.marginTop = caretStyle.float = null;
                btn = (
                    <a className={btnClass} role='button' onClick={handleClick} >
                        {label} {caret}
                    </a>
                )
                break;
        }
        return (
            <div ref='container' className={dropClass} style={style}>
                {btn}
                {dataList}
            </div >
        );
    }
}
//设置默认属性
Dropdown.defaultProps = defaultProps;