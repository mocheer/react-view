import React,{Component,PropTypes} from 'react'
/**
 * props{title,content,footer}
 */
export default class Panel extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        var {title,content,footer,children} = this.props;
        if(title){
             title = <div className="panel-heading">{title}</div>
        }
        if(content){
             content = <div className="panel-body">{content}</div>
        }
        if(footer){
             footer = <div className="panel-footer">{footer}</div>
        }
        return (
           <div className="panel panel-default">
                {title}
                {content}
                {children}
                {footer}
           </div>
        );
    }
}