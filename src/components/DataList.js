/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React,{Component,PropTypes} from 'react'
/**
 * actions:{loadingAction,clickAction}
 * store
 */
export default class DataList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            dataProvider:this.props.dataProvider
        };
    }
    render() {
       var dataProvider =  this.state.dataProvider;
       var dataRows;
       if(dataProvider){
            dataRows =  dataProvider.map(function(data){
                var dataLabel;
                if(typeof(data)==="object"){
                    dataLabel = data.label;
                }else{
                    dataLabel = data;
                }
                return <a role='button' className="list-group-item">{dataLabel}</a>
            });
        }
       return(
           <div className="list-group">
                {dataRows}
           </div>
       );
    }
}