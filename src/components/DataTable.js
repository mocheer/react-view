import React,{Component,PropTypes} from 'react'
import classNames from 'classnames';
/**
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
    render() {
        if (this.state.columns == null) {
            return <div></div>;
        }
        var columns = this.state.columns;
        var columnCount = columns.length;
        var dataProvider =  this.state.dataProvider;
        var headerColumns = columns.map(function(item,index){
            return <th width={item.width} >{item.headerText}</th>;
        });
        var dataRows;
        if(dataProvider){
            dataRows =  dataProvider.map(function(data,rowid){
                var dataColumns = columns.map(function(column,columnid){
                    var type = column.type;
                    var dataField = column.dataField;
                    return <td >{data[dataField]}</td>
                });
                return <tr data-rowid={rowid} >{dataColumns}</tr>
            });
        }else{
             var rowCount = 3;
             dataRows = [];
             for(var i = 0;i <rowCount; i++) {
                   dataRows.push(<tr data-rowid={i} ><td colSpan={columnCount}></td></tr>)
             }
        }
        var tableClass = classNames("table",
        {"table-hover":true},
        {"table-striped":true},
        {"table-bordered":true},
        {"table-condensed":true},
        "DataTable");
        return (
           <table className={tableClass}>
              <thead ><tr >{headerColumns}</tr></thead>
              <tbody >{dataRows}</tbody>
            </table>
       )
    }
}
