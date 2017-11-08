/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
let { helper } = T;
let defaultProps = {
    opened: false,  //是否展开
    direction: 'dropdown'//dropup 向上/上下展开
};
/**
 * @props dataProvider {label,val}
 * @props selIndex 
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
        if (dataProvider && selIndex === void 0) {
            selItem = helper.find(dataProvider, { checked: true }) || dataProvider[0]
        }
        /**
         * 
         */
        this.state = {
            dataProvider: dataProvider,
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
            let hide = e => {
                let { tag } = this.refs,
                    { target } = e,
                    parent = target;
                while (parent) {
                    if (parent === tag) {
                        return;
                    }
                    parent = parent.parentNode;
                }
                window.removeEventListener('click', hide)
                this.setState({ opened: false });
            }
            window.addEventListener('click', hide)
        }
    }
    /**
     * 点击列表事件派发
     * @param {*} event 
     * @param {*} index 
     */
    handleChange(event, index) {
        let { props, state } = this,
            { dataProvider } = state,
            selItem = dataProvider[index],
            { onChange } = props;
        let nextState = { opened: false, selIndex: index, selItem: selItem }
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
        let { selIndex } = state;
        let dataRows = dataProvider.map((data, index) => {
            let i = createI(data)
            let dataLabel = createLabel(data);
            let liClass = classNames({
                active: selIndex === index,
                disabled: data.disabled
            })
            return (
                <li className={liClass} key={index} onClick={handleChange.bind(this, event, index)}  >
                    <a role='button'> {i} {dataLabel}</a>
                </li>
            )
        });
        //跟按钮同宽度
        return <ul className='dropdown-menu' style={{ width: width, minWidth: 50, maxHeight: 320, overflowY: dataRows.length > 12 ? 'scroll' : 'auto', marginTop: type === 'btn' ? 10 : 0 }} >{dataRows}</ul>;//160
    }
    /**
     * 渲染
     */
    render() {
        let { props, state, handleClick, createLabel, createPopup } = this,
            { type, direction, style, width, labelFn, render, group, icon, label } = props,
            { opened, dataProvider, selItem } = state,
            dataList;
        label = (labelFn ? labelFn(selItem) : createLabel(selItem)) || dataProvider && dataProvider[0] || label;
        //
        if (!label) {
            return null;
        }
        render = render || createPopup;

        if (opened) {
            dataList = render.call(this, dataProvider, selItem)
        } else if (selItem && selItem.popup) {//暂时这样做，水情快速时间选择
            opened = true;
            dataList = selItem.popup;
            if (typeof dataList === 'function') {
                dataList = dataList()
            }
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
            <div ref='tag' className={dropClass} style={style}>
                {btn}
                {dataList}
            </div >
        );
    }
}
//设置默认属性
Dropdown.defaultProps = defaultProps;