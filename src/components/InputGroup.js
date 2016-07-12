import React,{Component,PropTypes} from 'react'
//TODO action
export class InputGroup extends Component{
    constructor(props) {
         super(props)
    }
    handleClick(event){
        var text = this.refs.textinput.value;
    }
    render(){
        var {props,handleClick} = this; 
        var {label,placeholder} = props;
        return (
             <div className="input-group">
                <input type="text" ref="textinput" className="form-control" placeholder={placeholder} />
                <div className="input-group-btn">
                     <button className="btn btn-default" type="button" onClick={handleClick.bind(this)} >{label}</button>
                </div>
            </div>
        );
    }
}

InputGroup.defaultProps = {
    placeholder:""
}