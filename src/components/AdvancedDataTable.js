import React,{Component,PropTypes} from 'react'
import classNames from 'classnames'
import moment from 'moment'
/**
 * column {dataField,headerText,type,width,group}
 * actions:{loadingAction,clickAction}
 * store
 */
export class AdvancedDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvider:props.dataProvider,
            columns:props.columns
        };
    }
    componentDidMount(){
        this.setHeaderWidth();
        var {store,source,actions} = this.props;
        if(store){
            store.subscribe(
                ()=>this.setState(store.getState())
            );
            if(source && actions){
                actions.loadingAction(source,store);
            }
        }
    }
    componentDidUpdate () {
        this.setHeaderWidth();
    }
    setHeaderWidth () {
        let body = this.refs.body;
        if(!body){
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
        let ths = this.refs.header.querySelectorAll('th');
        var columnCount = tds.length;
        if(ths.length !== columnCount){
            let nths = [];
            for (let i = 0,j = columnCount,count = ths.length;i < count; i++) {
                if(ths[i].colSpan>1){
                    nths.push();
                }else{
                    nths.push(ths[i]);
                }
            }
            ths = nths;
        }
        for (let i = 0; i < columnCount; i++) {
            ths[i].style.width = tds[i].offsetWidth + 'px';
        }
    }
    getColumnHeader(columns,props){
        var headerRows = [];
        var columnCount = columns.length;
        var {headerRowCount} = props;
        var headerColumns = columns.map((column,columnid)=>{
            let thProps = {
                key:columnid,
            }
            let {headerText,group,style} = column;
            if(headerRowCount>1 && !group){
                thProps.rowSpan = headerRowCount;
            }else if(group){
                if(columnid===0 || columns[columnid-1].group!==group){
                    var colSpan = 1;
                    for(var cid = columnid+1;cid<columnCount;cid++){
                        if(columns[cid].group === group){
                            colSpan++;
                        }else{
                            break;
                        }
                    }
                    if(!headerRows[1]){
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
    labelFunction(data,rowid,column,dataField){
        var label;
        switch(column.f){
            case "toFixed":
                label = data[dataField]
                if(label){
                    label = label.toFixed(column.format)
                }
                break;
            case "date":
                label = data[dataField];
                //format string[] ["YYYY-MM-D HH:mm:ss","HH:mm"]
                var m = moment(label,column.format[0]);
                if(m.isValid()){
                    label = m.format(column.format[1]);
                }
                break;
            case "rowid":
                label = rowid;
                break;
            case "link":
                var linkUrl = data["link-"+dataField];
                if(linkUrl){
                    return <a href={linkUrl} target="view_window" >{label}</a>
                }
                break;
            default:
                label = data[dataField];
                break;
        }
        return label;
    }
    getDataRow(columns,dataProvider,labelFunction){
        var dataRows;
        if(dataProvider){
            dataRows =  dataProvider.map((data,rowid)=>{
                var dataColumns = columns.map((column,columnid)=>{
                    var {type,dataField,style} = column;
                    var label = labelFunction(data,rowid,column,dataField)
                    var tdProps = {key:columnid,"data-rowid":rowid};
                    if(style){
                        tdProps.style = style;
                    }
                    switch(type){
                        case "group":
                            if(rowid===0 || dataProvider[rowid-1][dataField] !== label){
                                var rowSpan=1;
                                var rowCount = dataProvider.length;
                                for(var row = rowid+1;row<rowCount;row++){
                                    if(dataProvider[row][dataField] === label){
                                        rowSpan++;
                                    }else{
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
                });
                return <tr key={rowid} >{dataColumns}</tr>
            });
        }
        return dataRows;
    }
    handleClick(event){
        var {target} = event;//td
        var {rowid} = target;
        if(rowid !== undefined){
           var {props,state} = this;
           var {onClick} = props;
           if(onClick){
                var {dataProvider} = state;
                var selItem = dataProvider[rowid];
           }
        }
        
    }
    render() {
        var {props,state,getColumnHeader,getDataRow,labelFunction,handleClick} = this;
        var {columns,dataProvider} = state;
        if (!columns) {
            return null;
        }
        var headerRows = getColumnHeader(columns,props);
        var dataRows = getDataRow(columns,dataProvider,labelFunction);
        var tableClass = classNames("table",{"table-hover":true},{"table-striped":true},{"table-bordered":true},{"table-condensed":true});
        var {height} = props;
        var bodyStyle = {};
        if(height){ 
            bodyStyle.height = height - 25 * headerRows.length;
            bodyStyle.overflow = 'auto';
        }

        handleClick = handleClick.bind(this);
        return (
            <div className="table-responsive DataTable">
                <table className={tableClass} >
                    <thead ref="header">{headerRows}</thead>
                </table>
                <div className="bodyContainer" style={bodyStyle}>
                    <table className={tableClass} onClick={handleClick} >
                        <tbody ref="body" >{dataRows}</tbody>
                    </table>
                </div>
            </div>
       )
    }
}
