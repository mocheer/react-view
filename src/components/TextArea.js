import React,{Component,PropTypes} from 'react'

export  class TextArea extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <textarea className="form-control" rows={this.props.rows}></textarea>
        );
    }
}
TextArea.defaultProps ={
    rows:3
};//设置默认属性

