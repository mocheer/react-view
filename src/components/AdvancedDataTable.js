import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
// import moment from 'moment'
/**
 * column {dataField,headerText,type,width,group}
 * actions:{loadingAction,clickAction}
 * store
 */
export default class AdvancedDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvider: props.dataProvider,
            columns: props.columns,
            selItems: [],
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
    }
    /**
     * colSpan 合并列
     * 统一列表列宽
     */
    setHeaderWidth() {
        let body = this.refs.body;
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
        let ths = this.refs.header.querySelectorAll('th'),
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
        headerRows[1] = <tr key={1} >{headerRows[1]}</tr>;
        return headerRows;
    }

    /**
     * 创建数据行
     */
    createRows(columns, dataProvider, onItemClick, onItemOver) {
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
                onItemClick && (trProps.onClick = onItemClick.bind(data, data, rowid));
                onItemOver && (trProps.onMouseOver = onItemOver.bind(data, data, rowid));
                return <tr {...trProps} >{dataColumns}</tr>
            });
        }
        return dataRows;
    }

    onCheck(column, data) {
        var checked = data.checked = !data.checked,
            {state} = this,
            {selItems} = state,
            index = selItems.indexOf(data);
        if (checked && index === -1) {
            state.selItems.push(data)
        } else if (!checked && index !== -1) {
            state.selItems.splice(index, 1)
        }
        column.onChange(data, column, selItems)
        this.setState({})
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
    render() {
        var {props, state} = this,
            {columns, dataProvider} = state,
            {height, onItemClick, onItemOver} = props;
        if (!columns) {
            return null;
        }

        var headerRows = this.createHeader(columns, props),
            dataRows = this.createRows(columns, dataProvider, onItemClick, onItemOver),
            tableClass = classNames("table", { "table-hover": true }, { "table-striped": true }, { "table-bordered": true }, { "table-condensed": true }),
            bodyStyle = {};
        if (height) {
            bodyStyle.height = height - 25 * headerRows.length;
        }
        return (
            <div className="table-responsive DataTable">
                <div className="tableheader" >
                    <table className={tableClass} >
                        <thead ref="header">{headerRows}</thead>
                    </table>
                </div>
                <div className="tablebody" style={bodyStyle}>
                    <table className={tableClass} >
                        <tbody ref="body" >{dataRows}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}
