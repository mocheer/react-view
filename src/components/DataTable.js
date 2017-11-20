/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
let isMobile = T.Sys.isMobile();
/**
 * @param columns 
 * {
 *      field      //文本字段
 *      label      //表头文本
 *      itemGroup  //按顺序合并同组数据行
 *      itemIcon   //图标
 *      group      //合并表头
 *      fmt        //{type,val}|string
 *      html  
 * }
 * @param group         分组
 * @param showNoData    当dataProvider为空时显示no data提示框
 * @param reverse       倒序排列，常用于时间倒序
 * @param dataProvider  数据源：一维数组，树结构{label,children,expanded}
 * @param groupLabel    分组名称
 * @param headerStyle   表头样式
 * {
 *   backgroundColor 背景色：
 *   color           字体色：
 *   fontWeight      字体粗细：normal
 *   borderColor     边界线：
 *   height          行高：
 * }
 * 
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
        this.radioGroup = 'radio' + T.stmap;
    }
    /**
     * 
     */
    componentDidUpdate() {
        let { tablebody, refs } = this,
            { seltr } = refs;
        //滚轮移动
        if (seltr && (tablebody.scrollTop > seltr.offsetTop || tablebody.scrollTop + tablebody.clientHeight < seltr.offsetTop)) {
            tablebody.scrollTop = seltr.offsetTop;
        }
    }
    /**
     * colSpan 合并列
     * 统一列表列宽
     */
    setHeaderWidth() {
        let { tablebody, refs } = this,
            { body, header } = refs
        if (!body || !header) {
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
            if (tr.getAttribute('data-rowIndex') !== void 0) {//dataset.rowindex
                break;
            }
            i++;
        }
        let tds = tr.children;
        if (tds.length <= 1) {
            return;
        }
        let ths = header.querySelectorAll('th'),
            colCount = tds.length;
        //
        if (ths.length !== colCount) {
            let nths = [];
            for (let i = 0, l = colCount, count = ths.length; i < count; i++) {
                if (ths[i].colSpan > 1) {

                } else {
                    nths.push(ths[i]);
                }
            }
            ths = nths;
        }
        // 非移动端 加上滚动条宽度17-1
        if (!isMobile) {
            // || tablebody.offsetHeight > tablebody.clientHeight
            if (tablebody.scrollHeight > tablebody.clientHeight) {
                colCount--;
                ths[colCount].style.width = tds[colCount].offsetWidth + 16 + 'px';
            }
        }
        for (let i = 0; i < colCount; i++) {
            ths[i].style.width = tds[i].offsetWidth + 'px';
        }
    }
    /**
     * 创建列头
     */
    createHeader(columns, props) {
        var headerRows = [],
            colCount = columns.length,
            { headerRowCount, sortable, headerStyle } = props,//列表行数
            headerColumns = columns.map((column, colid) => {
                let { label, group, style, field, fmt } = column;
                let thProps = {
                    key: colid,
                    style: { width: style && style.width, borderColor: headerStyle && headerStyle.borderColor }
                }
                if (fmt === 'check') {
                    label = <input type="checkbox" checked={this.state.checkAll} onChange={e => {
                        let { dataProvider } = this;
                        let checked = !this.state.checkAll;
                        dataProvider.forEach(item => {
                            item.checked = checked;
                        })
                        this.props.onCheckAll && this.props.onCheckAll({ target: this, checked: checked })
                        this.setState({ checkAll: !this.state.checkAll })
                    }} />
                }
                if (headerRowCount > 1 && !group) {
                    thProps.rowSpan = headerRowCount;
                } else if (group) {//列头合并，多表头
                    if (colid === 0 || columns[colid - 1].group !== group) {
                        var colSpan = 1;
                        for (var cid = colid + 1; cid < colCount; cid++) {
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
        headerRows[0] = <tr key={0} style={{ height: headerStyle && headerStyle.height }}>{headerColumns}</tr>;
        if (headerRows[1]) {
            headerRows[1] = <tr key={1} >{headerRows[1]}</tr>;
        }
        return headerRows;
    }
    /**
     * 创建数据行
     */
    createRows(columns, dataProvider, selIndex, group) {
        let { props, cellFn } = this,
            dataRows = [],
            { styleFunc } = props;
        cellFn = cellFn.bind(this)
        if (dataProvider) {
            let rowFn = (data, rowid, itemIndex) => {
                let dataColumns = columns.map((column, colid) => {
                    let { itemGroup, field, style, html } = column,
                        label = cellFn(data, itemIndex === void 0 ? rowid : itemIndex, column, field),
                        tdProps = { key: colid };
                    if (style) {//宽度已由colgroup设置,但其他样式需要每列都设置
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
                    //html 为了 <br/> 换行
                    if (html) {
                        tdProps.dangerouslySetInnerHTML = { __html: label }
                        return <td {...tdProps} />
                    }
                    return <td {...tdProps} >{label}</td>
                }),
                    trProps = { key: rowid }
                selIndex === rowid && (trProps.className = 'info') && (trProps.ref = 'seltr')
                if (styleFunc) {
                    trProps.style = styleFunc(data)
                }
                return <tr {...trProps} data-rowIndex={rowid} data-itemIndex={data.__index || rowid} >{dataColumns}</tr>
            }, rowid = 0;

            dataProvider.forEach((item, index) => {
                //分组
                if (item.children) {
                    dataRows.push(
                        <tr style={styleFunc && styleFunc(item)} onClick={e => {
                            item.expanded = !item.expanded;
                            this.forceUpdate();
                        }} role='button' >
                            {/* <td colSpan={columns.length}>
                                <span className="caret" style={{ marginRight: 5 }} />
                                {item.label}
                            </td> */}
                            <td colSpan={columns.length} dangerouslySetInnerHTML={{ __html: '<span class="caret" style="margin-right: 5px;" ></span>' + item.label }} />
                        </tr>
                    )
                    // rowid++
                    if (item.expanded && item.children) {
                        item.children.forEach((dataItem, itemIndex) => {
                            dataRows.push(rowFn(dataItem, rowid++, itemIndex));//key 一样的话展不开
                        })
                    }

                } else {
                    dataRows.push(rowFn(item, index));//key 一样的话展不开
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
     * radio 选中
     */
    onRadioCheck(data, column) {
        let { props, dataProvider } = this
        for (let i = 0, l = dataProvider.length, item; i < l; i++) {
            item = dataProvider[i];
            item.checked = false;
        }
        data.checked = true;
        column.onChange(data, column)
        this.forceUpdate()
    }
    /**
     * 事件信息
     * @update 2017.11.17 因为浏览器兼容弃用dataset
     */
    getEventInfo(event) {
        var info = {},
            { props, dataProvider } = this,
            { sort, group, reverse } = props,
            td = event.target,
            { cellIndex: colid, parentElement } = td,
            dataRowid = parentElement.getAttribute('data-rowIndex'),
            rowid = +dataRowid, //parentElement.rowIndex;//td.parentElement = tr
            itemindex = +parentElement.getAttribute('data-itemIndex')
        if (dataProvider && dataRowid) {
            info.target = td;
            info.colid = colid;
            info.rowid = rowid; //当前rowid，用于标识选中行，并修改选中行背景
            info.dataProvider = dataProvider;
            info.index = rowid;
            info.data = dataProvider[itemindex];//
            //台风
            if (!sort && !group && reverse) {
                info.data = dataProvider[dataProvider.length - (+itemindex) - 1]
            }
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
        console.log(data, !data || (data && data.children))
        if (!data || (data && data.children)) {//分组行点击
            return;
        } else {
            onItemClick && onItemClick(info)
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
    cellFn(data, rowid, column, field) {
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
            case 'radio':
                label = <input type="radio" name={this.radioGroup} checked={data.checked} onChange={this.onRadioCheck.bind(this, data, column)} />
                break;
            case 'toFixed1'://雨量
                val = val || 1;
            case 'toFixed2'://水位
                val = val || 2;
            case "toFixed"://数字
                if ((label = data[field]) || label === 0) {
                    label = label.toFixed(val)
                }
                break;
            case "date"://时间
                label = T.clock(data[field]).fmt(val)
                break;
            case "rowid"://序号，从1开始
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
            { columns, expand, groupLabel, headerStyle } = props,
            { selIndex } = state,
            { group, sort, width, height, reverse, onTableOut, showNoData, nodataRender } = props
        if (!columns) return null;
        let cols = columns.map(item => {
            return <col style={item.style} />
        })
        let colgroup = <colgroup>{cols}</colgroup>;
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
                        expandAll = expand === true,
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
                                let items = temp[label]
                                label = groupLabel && T.helper.fmt(groupLabel, { label: label, count: items.length }) || label
                                let item = { lv: index, label: label, children: items, expanded: expandAll || expand > children.length };
                                if (index + 1 < len) {
                                    fn(index + 1, item)
                                }
                                children.push(item)
                            }
                        }
                    fn(0, gc)
                }
                dataProvider = this.gc.children;
            }
            //倒序
            if (reverse) {
                dataProvider = dataProvider.concat().reverse();
            }
        }
        //
        let headerVisible = !headerStyle || headerStyle.display !== 'none',
            { border, hover, condensed, striped, style } = props,
            headerRows = this.createHeader(columns, props),
            dataRows = this.createRows(columns, dataProvider, selIndex, group),
            tableClass = classNames("table", { "table-hover": hover }, { "table-condensed": condensed }, { "table-striped": striped }, { "table-bordered": border }),
            bodyStyle = { width: width, overflowY: 'auto' };
        headerStyle = Object.assign(headerStyle || {}, { width: width });
        bodyStyle.height = headerVisible ? height : height - 33 * headerRows.length;
        //
        let onTableClick = this.onTableClick.bind(this),
            onTableOver = this.onTableOver.bind(this);
        //
        let NoData;
        // 无数据
        if (showNoData && (!dataProvider || dataProvider.length === 0))
            NoData = nodataRender && nodataRender(this) || (
                <div style={{
                    position: 'relative',
                    top: -height * 0.5,
                    height: 0,
                    paddingLeft: '35%'
                }}>
                    <div style={{
                        width: 120,
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        border: 'solid #999',
                        color: '#777'
                        // transform: 'rotate(20deg)'
                    }}>
                        {typeof showNoData === 'string' ? showNoData : '暂无数据'}
                    </div>
                </div>
            )
        return (
            <div className="table-responsive DataTable" style={style}>
                {
                    headerVisible && <div ref={e => {
                        this.header = e;
                    }} className="header" style={headerStyle} >
                        <table className={tableClass}  >
                            <thead ref="header">{headerRows}</thead>
                        </table>
                    </div>
                }
                <div ref={e => {
                    if (e) {
                        let { header } = this
                        this.tablebody = e;
                        // 减去表头高度
                        // 当父节点隐藏时 header.clientHeight = 0,td.offsetWidth = 0
                        if (height && header) {
                            header.clientHeight && this.setHeaderWidth();
                            e.style.height = (height - (header.clientHeight || headerStyle.height || 33)) + 'px';
                        }
                    }
                }}
                    className="content"
                    style={bodyStyle}
                    onClick={onTableClick}
                    onMouseOver={onTableOver}
                    onMouseOut={onTableOut}>
                    <table className={tableClass} style={{ borderTop: 0 }} >
                        {colgroup}
                        <tbody ref="body" >{dataRows}</tbody>
                    </table>
                </div>
                {NoData}
            </div >
        )
    }
}
/**
 * 初始化属性
 */
DataTable.defaultProps = {
    striped: true,  //条纹
    condensed: true,//
    hover: true,    //hover
    border: true    //边框
}
