/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
/**
 * @param columns 
 * {
 *      field      //
 *      label      //表头文本
 *      itemGroup  //按顺序合并同组数据行
 *      itemIcon   //图标
 *      group      //合并表头
 *      fmt        //{type,val}|string
 * }
 * @param group      分组
 * @param showNoData 当dataProvider为空时显示no data提示框
 * @param reverse    倒序排列，比如说台风路径信息
 */
export default class DataTable extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            selIndex: -1
        };
    }
    /**
     * 设置列头宽度
     */
    componentDidMount() {
        this.setHeaderWidth();
    }
    /**
     * 
     */
    componentDidUpdate() {
        this.setHeaderWidth();
        let { refs } = this,
            { tablebody, seltr } = refs;
        if (seltr && (tablebody.scrollTop > seltr.offsetTop || tablebody.scrollTop + tablebody.clientHeight < seltr.offsetTop)) {
            tablebody.scrollTop = seltr.offsetTop;
        }
    }
    /**
     * colSpan 合并列
     * 统一列表列宽
     */
    setHeaderWidth() {
        let { refs } = this,
            { tablebody, body } = refs
        if (!body) {
            return;
        }
        let trs = body.children,
            len = trs.length,
            i = 0;
        if (len <= 0) {
            return;
        }
        while (i < len) {
            tr = trs[i]
            if (tr.dataset.rowindex !== void 0) {
                break;
            }
            i++;
        }
        let tds = tr.children;
        if (tds.length <= 1) {
            return;
        }
        let header = refs.header,
            ths = header.querySelectorAll('th'),
            columnCount = tds.length;
        //
        if (ths.length !== columnCount) {
            let nths = [];
            for (let i = 0, l = columnCount, count = ths.length; i < count; i++) {
                if (ths[i].colSpan > 1) {

                } else {
                    nths.push(ths[i]);
                }
            }
            ths = nths;
        }
        if (tablebody.scrollHeight > tablebody.clientHeight || tablebody.offsetHeight > tablebody.clientHeight) {
            columnCount--;
            ths[columnCount].width = tds[columnCount].offsetWidth + 16;
        }

        for (let i = 0; i < columnCount; i++) {
            ths[i].width = tds[i].offsetWidth;
        }
    }
    /**
     * 创建列头
     */
    createHeader(columns, props) {
        var headerRows = [],
            columnCount = columns.length,
            { headerRowCount, sortable } = props,//列表行数
            headerColumns = columns.map((column, columnid) => {
                let thProps = {
                    key: columnid,
                }
                let { label, group, style, field, fmt } = column;
                if (headerRowCount > 1 && !group) {
                    thProps.rowSpan = headerRowCount;
                } else if (group) {//列头合并，多表头
                    if (columnid === 0 || columns[columnid - 1].group !== group) {
                        var colSpan = 1;
                        for (var cid = columnid + 1; cid < columnCount; cid++) {
                            if (columns[cid].group === group) {
                                colSpan++;
                            } else {
                                break;
                            }
                        }
                        if (!headerRows[1]) {
                            headerRows[1] = [];
                        }
                        headerRows[1].push(<th {...thProps} >{label}</th>);
                        return <th {...thProps} colSpan={colSpan} >{group}</th>;
                    }
                    headerRows[1].push(<th {...thProps} >{label} </th>)
                    return null;
                }
                let sortBtn = (sortable && (field || fmt === 'rowid') ?
                    <div style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: 8 }}  >
                        <div role='button' style={{ height: 6 }} onClick={e => {
                            if (field) {
                                this.sc = null
                                props.sort = { fields: [field] }
                            } else {
                                props.reverse = !props.reverse
                            }
                            this.forceUpdate()
                        }} >
                            <span className="caret" style={{ marginTop: -6, borderTop: 0, borderBottom: '4px dashed' }} />
                        </div>
                        <div role='button' style={{ height: 6 }} onClick={e => {
                            if (field) {
                                this.sc = null
                                props.sort = { fields: [field], desc: -1 }
                            } else {
                                props.reverse = !props.reverse
                            }
                            this.forceUpdate()
                        }}>
                            <span className="caret" style={{ marginTop: -6 }} />
                        </div>
                    </div> : null
                )
                return (
                    <th {...thProps} >
                        {label}
                        {sortBtn}
                    </th>
                )
            });
        headerRows[0] = <tr key={0} >{headerColumns}</tr>;
        if (headerRows[1]) {
            headerRows[1] = <tr key={1} >{headerRows[1]}</tr>;
        }
        return headerRows;
    }
    /**
     * 创建数据行
     */
    createRows(columns, dataProvider, selIndex, group) {
        let dataRows = [],
            cellFunc = this.cellFunc.bind(this)
        if (dataProvider) {
            let rowFunc = (data, rowid) => {
                let dataColumns = columns.map((column, columnid) => {
                    let { itemGroup, field, style } = column,
                        label = cellFunc(data, rowid, column, field),
                        tdProps = { key: columnid };
                    if (style) {//宽度只需要第一个，但其他样式需要每列都设置
                        tdProps.style = style;
                    }
                    //将同一组的数据合并成一行（前提是已经按序排列）
                    if (itemGroup) {
                        if (rowid === 0 || dataProvider[rowid - 1][field] !== label) {
                            var rowSpan = 1;
                            var rowCount = dataProvider.length;
                            for (var row = rowid + 1; row < rowCount; row++) {
                                if (dataProvider[row][field] === label) {
                                    rowSpan++;
                                } else {
                                    break;
                                }
                            }
                            tdProps.rowSpan = rowSpan;
                            return <td {...tdProps} >{label}</td>;
                        }
                        return null;
                    }
                    return <td {...tdProps} >{label}</td>
                }),
                    trProps = { key: rowid }
                selIndex === rowid && (trProps.className = 'info') && (trProps.ref = 'seltr')
                return <tr {...trProps} data-rowIndex={rowid} data-itemIndex={data.__index} >{dataColumns}</tr>
            }, rowid = 0;

            dataProvider.forEach((item, index) => {
                if (item.isGroup) {
                    dataRows.push(
                        <tr onClick={e => {
                            item.expanded = !item.expanded;
                            this.forceUpdate();
                        }} role='button' >
                            <td colSpan={columns.length}>
                                <span className="caret" style={{ marginRight: 5 }} />
                                {item.label}
                            </td>
                        </tr>
                    )
                    // rowid++
                    if (item.expanded && item.children) {
                        item.children.forEach((dataItem, itemIndex) => {

                            dataRows.push(rowFunc(dataItem, rowid++));//key 一样的话展不开index * 10 + itemIndex
                        })
                    }

                } else {
                    dataRows.push(rowFunc(item, index));//key 一样的话展不开
                }

            });
        }
        return dataRows;
    }
    /**
     * checkbox 选中
     */
    onCheck(data, column) {
        let checked = data.checked = !data.checked,
            { props, dataProvider } = this,
            selItems = []
        for (let i = 0, l = dataProvider.length, item; i < l; i++) {
            item = dataProvider[i];
            item !== data && item.checked && selItems.push(item)
        }
        checked && selItems.push(data)
        column.onChange(data, column, selItems)
        this.forceUpdate()
    }
    /**
     * 事件信息
     */
    getEventInfo(event) {
        var info = {},
            { props, dataProvider } = this,
            { reverse } = props,
            td = event.target,
            { cellIndex: columnid, parentElement } = td,
            { dataset } = parentElement,
            rowid = +dataset.rowindex //parentElement.rowIndex;//td.parentElement = tr
        if (dataProvider && rowid !== void 0) {
            info.target = td;
            info.columnid = columnid;
            info.rowid = rowid; //当前rowid，用于标识选中行，并修改选中行背景
            info.dataProvider = dataProvider;
            info.index = reverse ? dataProvider.length - 1 - rowid : rowid;
            info.data = dataProvider[+dataset.itemindex];//经过了排序，目前这个值是错的
        }
        return info
    }
    /**
     * 表格点击
     */
    onTableClick(event) {
        var info = this.getEventInfo(event),
            { onItemClick } = this.props,
            { data } = info;
        onItemClick && onItemClick(info)
        if (data && data.children) {
            return;
        }
        this.setState({
            selIndex: info.rowid
        })
    }
    /**
     * 列表项移入效果
     */
    onTableOver(event) {
        var info = this.getEventInfo(event),
            { onItemOver } = this.props
        onItemOver && onItemOver(info)
    }
    /**
    * 格式化
    */
    cellFunc(data, rowid, column, field) {
        let { fmt } = column,
            label, type = fmt, val;
        if (typeof fmt == 'object') {
            type = fmt.type;
            val = fmt.val;
        }
        switch (type) {
            case "check"://复选框
                label = <input type="checkbox" checked={data.checked} onChange={this.onCheck.bind(this, data, column)} />
                break;
            case "toFixed"://数字
                if (label = data[field]) {
                    label = label.toFixed(val)
                }
                break;
            case "date"://时间
                label = T.clock(data[field]).fmt(val)
                break;
            case "rowid"://序号
                label = rowid + 1;
                break;
            case "link"://超链接
                var linkUrl = data["link-" + field]
                label = linkUrl && (<a href={linkUrl} target="view_window" >{data[field]}</a>) || data[field]
                break;
            default:
                label = data[field];
                break;
        }
        return label;
    }

    /**
     * 获取数据源
     */
    get dataProvider() {
        let { props, state } = this;
        return state.dataProvider || props.dataProvider;
    }
    /**
     * 渲染
     */
    render() {
        let { props, state, dataProvider } = this,
            { columns, expandAll, groupLabel } = props,
            { selIndex } = state,
            { group, sort, width, height, reverse, onTableOut, showNoData } = props
        if (!columns) return null;
        // 无数据
        if (!dataProvider && showNoData)
            return (
                <div style={{
                    height: height || 50,
                    backgroundColor: '#FFFFFF',
                    paddingTop: height * 0.4,
                    paddingLeft: '35%'
                }}>
                    <div style={{
                        width: 120,
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        border: 'solid red',
                        color: 'red',
                        transform: 'rotate(20deg)'
                    }}>
                        {typeof showNoData === 'string' ? showNoData : '暂无数据'}
                    </div>
                </div>
            )
        let colgroup;
        // 倒序排序，分组时不能倒序
        if (dataProvider) {
            // 排序
            if (sort) {
                let { sc } = this;
                if (!sc) {
                    this.sc = sc = {};
                }
                let { source } = sc;
                if (source !== dataProvider) {
                    sc.source = dataProvider;
                    let arr = dataProvider.map((item, index) => {
                        if (item.__index === void 0) {
                            item.__index = index;
                        }
                        return item;
                    })
                    sc.children = T.helper.sortOn(arr, sort)//dataProvider.concat()
                }
                dataProvider = sc.children;
            }

            // 分组
            if (group && group.fields) {
                if (!this.gc || this.gc.group !== group || this.gc.source !== dataProvider) {
                    let { fields } = group,
                        len = fields.length,
                        gc = this.gc = { group: group, children: dataProvider, source: dataProvider },
                        fn = (index, result) => {
                            let temp = {},
                                field = fields[index],
                                { children } = result;
                            for (let j = 0, len = children.length; j < len; j++) {
                                let item = children[j],
                                    val = item[field],
                                    itemChildren = temp[val] = temp[val] || [];
                                itemChildren.push(item);
                            }

                            children = result.children = []
                            for (let label in temp) {
                                let children = temp[label]
                                label = groupLabel && T.helper.fmt(groupLabel, { label: label, count: children.length }) || label
                                let item = { lv: index, label: label, children: children, isGroup: true, expanded: expandAll };
                                if (index + 1 < len) {
                                    fn(index + 1, item)
                                }
                                children.push(item)
                            }
                        }
                    fn(0, gc)
                    let cols = columns.map(item => {
                        return <col style={item.style} />
                    })
                    gc.colgroup = <colgroup>{cols}</colgroup>;
                }
                dataProvider = this.gc.children;
                colgroup = this.gc.colgroup;
            }
            //倒序
            if (reverse) {
                dataProvider = dataProvider.concat().reverse();
            }
        }
        //
        let { border, hover, condensed, striped } = props,
            headerRows = this.createHeader(columns, props),
            dataRows = this.createRows(columns, dataProvider, selIndex, group),
            tableClass = classNames("table", { "table-hover": hover }, { "table-condensed": condensed }, { "table-striped": striped }, { "table-bordered": border }),
            bodyStyle = {};
        // 默认，无限
        if (height) {
            bodyStyle.height = height - 33 * (headerRows.length);//减去头部高度
        }
        let headerStyle;
        // 默认 div 100%
        if (width) {
            bodyStyle.width = width;
            headerStyle = { width: width }

            if (T.Sys.isMobile()) {
                bodyStyle.overflowX = headerStyle.overflowX = 'hidden'
            }
        }


        //
        let onTableClick = this.onTableClick.bind(this),
            onTableOver = this.onTableOver.bind(this);

        return (
            <div className="table-responsive DataTable" style={props.style}>
                <div className="tableheader" style={headerStyle} >
                    <table className={tableClass}  >
                        <thead ref="header">{headerRows}</thead>
                    </table>
                </div>
                <div ref='tablebody' className="tablebody" onClick={onTableClick} onMouseOver={onTableOver} style={bodyStyle} onMouseOut={onTableOut}>
                    <table className={tableClass} style={{ borderTop: 0 }} >
                        {colgroup}
                        <tbody ref="body" >{dataRows}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}
/**
 * 初始化属性
 */
DataTable.defaultProps = {
    striped: true, //条纹
    condensed: true,
    hover: true, //hover
    border: false //边框
}
