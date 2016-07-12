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
    handleClick(event) {
      var clickTarget = event.target;
      switch(clickTarget.innerText){
          case "+":
            dataProvider = this.state.dataProvider;
            dataProvider.splice(0,0,{});
            this.setState({dataProvider:dataProvider});
            break;
          case "-":
            dataProvider = this.state.dataProvider;
            dataProvider.splice(clickTarget["data-rowid"],1);
            this.setState({dataProvider:dataProvider});
            break;
      }
    }
    render() {
        var {props,state,handleClick} = this;
        var {columns,dataProvider} = state;
        var {height} = props;
        if (columns == null) {
            return <div></div>;
        }
        var columnCount = columns.length;
        var handleClick = handleClick.bind(this);
        var headerColumns = columns.map(function(item,index){
            if(item.headerText==="+"){
                return <th width={item.width} onClick={handleClick} ><a href="javascript:void(0)" >+</a></th>
            }
            return <th width={item.width} >{item.headerText}</th>;
        });
        
        var dataRows;
        if(dataProvider){
            dataRows =  dataProvider.map(function(data,rowid){
                var dataColumns = columns.map(function(column,columnid){
                    var type = column.type;
                    var dataField = column.dataField;
                    switch(type){
                        case "rowid":
                            return <td >{rowid}</td>
                        case "-":
                            return <td onClick={handleClick} ><a href="javascript:void(0)" data-rowid={rowid} >-</a></td>;
                        case "link":
                            var linkUrl = data["link-"+dataField];
                            if(linkUrl){
                                return <td ><a href={linkUrl} target="view_window" >{data[dataField]}</a></td>
                            }
                        default:
                            return <td >{data[dataField]}</td>
                    }
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
            <div className="table-responsive" style={{height:height,overflow:"auto"}}>
                <table className={tableClass}>
                    <thead><tr>{headerColumns}</tr></thead>
                    <tbody>{dataRows}</tbody>
                </table>
            </div>
       )
    }
}
