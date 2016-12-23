import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
//TODO action
//divider 分割
export default class ComboBox extends Component {
    constructor(props) {
        super(props);
        let {dataProvider} = props,
            selIndex = props.selIndex || (dataProvider && dataProvider.length > 0 && 0),
            selItem = props.selItem || (selIndex >= 0 && dataProvider[selIndex])
        this.state = {
            dataProvider: dataProvider,
            selItem: selItem,
            selIndex: selIndex,
            opened: props.opened
        }
    }
    handleClick(event) {
        this.setState({ opened: !this.state.opened });
    }
    handleChange(event, index) {
        let {props, state} = this,
            {dataProvider} = this.state,
            selItem = dataProvider[index],
            {onClick} = props;
        onClick && onClick(selItem)
        this.setState({ opened: false, selIndex: index, selItem: selItem });
    }
    createLabel(data) {
        if (typeof (data) === "object") {
            return data.label;
        } else {
            return data;
        }
    }

    createI(data){
        if(data.i){
            return <i className={data.i} />
        }
    }

    render() {
        var {props, state, createLabel, createI,handleClick, handleChange} = this;
        var {type} = props;
        var {opened, dataProvider, selIndex, selItem} = state;
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
            dataList = <ul className="dropdown-menu" >{dataRows}</ul>;
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