/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

/**
 * column {dataField,headerText,type,width,group}
 * actions:{loadingAction,clickAction}
 * store
 * showNoData 当dataProvider为空时显示no data
 * reverse  倒序排列
 */
export default class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvider: props.dataProvider,
            columns: props.columns,
        };
    }
    componentDidMount() {
        this.setHeaderWidth();
        var {store, source, actions} = this.props;
        if (store) {
            store.subscribe(
                () => this.setState(store.getState())
            );
            if (source && actions) {
                actions.loadingAction(source, store);
            }
        }
    }
    componentDidUpdate() {
        this.setHeaderWidth();
        let {refs} = this,
            {tablebody, seltr} = refs;
        if (seltr && (tablebody.scrollTop > seltr.offsetTop || tablebody.scrollTop + tablebody.clientHeight < seltr.offsetTop)) {
            tablebody.scrollTop = seltr.offsetTop;
        }
    }
    /**
     * colSpan 合并列
     * 统一列表列宽
     */
    setHeaderWidth() {
        let {refs} = this,
            tablebody = refs.tablebody,
            body = refs.body;
        if (!body) {
            return;
        }
        let tr = body.querySelector('tr');
        if (!tr) {
            return;
        }
        let tds = tr.querySelectorAll('td');
        if (tds.length <= 1) {
            return;
        }
        let header = refs.header,
            ths = header.querySelectorAll('th'),
            columnCount = tds.length;
        if (ths.length !== columnCount) {
            let nths = [];
            for (let i = 0, l = columnCount, count = ths.length; i < count; i++) {
                if (ths[i].colSpan > 1) {
                    nths.push();
                } else {
                    nths.push(ths[i]);
                }
            }
            ths = nths;
        }
        if(tablebody.scrollHeight>tablebody.clientHeight||tablebody.offsetHeight>tablebody.clientHeight){
             columnCount --;
             ths[columnCount].width = tds[columnCount].offsetWidth+16;
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
            {headerRowCount} = props,
            headerColumns = columns.map((column, columnid) => {
                let thProps = {
                    key: columnid,
                }
                let {headerText, group, style} = column;
                if (headerRowCount > 1 && !group) {
                    thProps.rowSpan = headerRowCount;
                } else if (group) {
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
                        headerRows[1].push(<th {...thProps} >{headerText}</th>);
                        return <th {...thProps} colSpan={colSpan} >{group}</th>;
                    }
                    headerRows[1].push(<th {...thProps} >{headerText}</th>)
                    return null;
                }
                return <th {...thProps} >{headerText}</th>;
            });
        headerRows[0] = <tr key={0} >{headerColumns}</tr>;
        if(headerRows[1] ){
            headerRows[1] = <tr key={1} >{headerRows[1]}</tr>;
        }
        return headerRows;
    }
    /**
     * 创建数据行
     */
    createRows(columns, dataProvider, selIndex) {
        let dataRows,
            labelFunc = this.labelFunc.bind(this)
        if (dataProvider) {
            dataRows = dataProvider.map((data, rowid) => {
                let dataColumns = columns.map((column, columnid) => {
                    let {type, dataField, style} = column,
                        label = labelFunc(data, rowid, column, dataField),
                        tdProps = { key: columnid };
                    if (style) {
                        tdProps.style = style;
                    }
                    switch (type) {
                        case "group"://将同一组的数据合并成一行（前提是已经按序排列）
                            if (rowid === 0 || dataProvider[rowid - 1][dataField] !== label) {
                                var rowSpan = 1;
                                var rowCount = dataProvider.length;
                                for (var row = rowid + 1; row < rowCount; row++) {
                                    if (dataProvider[row][dataField] === label) {
                                        rowSpan++;
                                    } else {
                                        break;
                                    }
                                }
                                tdProps.rowSpan = rowSpan;
                                return <td {...tdProps} >{label}</td>;
                            }
                            return null;
                        default:
                            return <td {...tdProps} >{label}</td>
                    }
                }),
                    trProps = { key: rowid }
                selIndex === rowid && (trProps.className = 'info') && (trProps.ref = 'seltr')
                return <tr {...trProps} >{dataColumns}</tr>
            });
        }
        return dataRows;
    }
    /**
     * checkbox 选中
     */
    onCheck(column, data) {
        let checked = data.checked = !data.checked,
            {state} = this,
            {dataProvider} = state,
            selItems = []
        for (let i = 0, l = dataProvider.length, item; i < l; i++) {
            item = dataProvider[i];
            item !== data && item.checked && selItems.push(item)
        }
        checked && selItems.push(data)
        column.onChange(data, column, selItems)
        this.setState({})
    }
    /**
     * 事件信息
     */
    getEventInfo(event) {
        var info = {},
            {props, state} = this,
            {dataProvider} = state,
            {reverse} = props,
            td = event.target,
            columnid = td.cellIndex, //
            rowid = td.parentElement.rowIndex;//td.parentElement = tr
        if (!dataProvider) {
            return {}
        }
        info.target = td;
        info.columnid = columnid;
        info.rowid = rowid;
        info.dataProvider = dataProvider;
        info.index = reverse ? dataProvider.length - 1 - rowid : rowid;
        info.data = dataProvider[info.index];
        return info
    }
    /**
     * 表格点击
     */
    onTableClick(event) {
        var info = this.getEventInfo(event),
            {onItemClick} = this.props
        onItemClick && onItemClick(info)
        this.setState({
            selIndex: info.index
        })
    }
    /**
     * 
     */
    onTableOver(event) {
        var info = this.getEventInfo(event),
            {onItemOver} = this.props
        onItemOver && onItemOver(info)
    }
    /**
    * 格式化
    */
    labelFunc(data, rowid, column, dataField) {
        var label;
        switch (column.f) {
            case "check":
                label = <input type="checkbox" checked={data.checked} onChange={this.onCheck.bind(this, column, data)} />
                break;
            case "toFixed":
                label = data[dataField] && label.toFixed(column.format)
                break;
            case "date":
                label = data[dataField];
                //format string[] ["YYYY-MM-D HH:mm:ss","HH:mm"]
                var m = moment(label, column.format[0]);
                if (m.isValid()) {
                    label = m.format(column.format[1]);
                }
                break;
            case "rowid":
                label = rowid;
                break;
            case "link":
                var linkUrl = data["link-" + dataField]
                label = linkUrl && (<a href={linkUrl} target="view_window" >{data[dataField]}</a>) || data[dataField]
                break;
            default:
                label = data[dataField];
                break;
        }
        return label;
    }
    /**
     * 渲染
     */
    render() {
        let {props, state} = this,
            {columns, dataProvider, selIndex} = state,
            {height, reverse, onTableOut,showNoData} = props
        if (!columns) return null;
        if(!dataProvider && showNoData)
            return (
                <div style={{
                    height: height,
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
                        暂无数据
                </div>
                </div>)
        //
        let headerRows = this.createHeader(columns, props),
            dataRows = this.createRows(columns, dataProvider, selIndex),
            tableClass = classNames("table", { "table-hover": true }, { "table-condensed": true }, { "table-striped": true }, { "table-bordered": true }, { "table-condensed": true }),
            bodyStyle = {};
        if (height) {
            bodyStyle.height = height - 33 * (headerRows.length);//减去头部高度
        }
        reverse && dataRows && dataRows.reverse()
        //
        let onTableClick = this.onTableClick.bind(this),
            onTableOver = this.onTableOver.bind(this)
        return (
            <div className="table-responsive DataTable">
                <div className="tableheader" >
                    <table className={tableClass} >
                        <thead ref="header">{headerRows}</thead>
                    </table>
                </div>
                <div ref='tablebody' className="tablebody" onClick={onTableClick} onMouseOver={onTableOver} style={bodyStyle} onMouseOut={onTableOut}>
                    <table className={tableClass} >
                        <tbody ref="body" >{dataRows}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}