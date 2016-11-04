import React,{Component,PropTypes} from 'react'
import classNames from 'classnames'
//TODO action
export default class ComboBox extends Component{
    constructor(props) {
        super(props);
        var {opened,dataField,dataProvider,selectedIndex} = props;
        var selectedItem;
        if(selectedIndex>0 && selectedIndex<dataProvider){
            selectedItem = dataProvider[selectedIndex];
        }else if(dataProvider.length>0){
            selectedIndex = 0;
            selectedItem = dataProvider[0];
        }
        this.state = {
            dataProvider:dataProvider,
            selectedItem:selectedItem,
            selectedIndex:selectedIndex,
            opened:opened
        }
    }
    handleClick(event){
        this.setState({opened:!this.state.opened});
    }
    handleChange(event,index){
        var {dataProvider} = this.state;
        var selectedItem = dataProvider[index];
        this.setState({opened:false,selectedIndex:index,selectedItem:selectedItem});
    }
    getItemLabel(data){
        if(typeof(data)==="object"){
            return data.label;
        }else{
            return data;
        }
    }
    render(){
        var {props,state,getItemLabel,handleClick,handleChange} = this;
        var {type} = props;
        var {opened,dataProvider,selectedIndex,selectedItem} = state;
        var label = getItemLabel(selectedItem);
        var dataList;
        handleClick = handleClick.bind(this);
        if(opened){
            var dataRows = dataProvider.map((data,index)=>{
                var dataLabel = getItemLabel(data);
                var liClass = classNames({
                    "active":selectedIndex===index,
                    "disabled":data.disabled
                })
                return <li className={liClass} key={index} onClick={handleChange.bind(this,event,index)}  ><a href="javascript:void(0)">{dataLabel}</a></li>
            });
            dataList = <ul className="dropdown-menu" >{dataRows}</ul>;
        }
        var dropClass = classNames(type,{open:opened},"ComboBox");
        var btnClass = classNames("btn","btn-default","dropdown-toggle");
        return (
            <div className={dropClass}>
                <button className={btnClass} type="button" onClick={handleClick} >
                   {label} <span className="caret"></span>
                </button>
                {dataList}
            </div>
        );
    }
}
//设置默认属性
ComboBox.defaultProps ={
    selectedIndex:-1,
    dataProvider:[],
    opened:false,
    type:"dropdown"//dropup
};