import React, {Component,PropTypes} from 'react';


export default class TreeView extends Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed:props.collapsed,
            labelField:props.labelField || 'label',
            icon:props.icon,
        }
    }
    /**
     * 
     */
    render(){

    }
}