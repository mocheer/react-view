/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2017.6.13
 */
import React, { Component, PropTypes } from 'react'
/**
 * 鹰眼地图
 */
export default class HawkeyeMap extends Component{
    constructor(props){
        super(props)
    }
    /**
     * 
     */
    componentDidMount(){
        
    }
    render(){
        let {props,state} = this,
            {map} = props;
        
        return (
            <div ref='hawkeyeMap'>
                
            </div>
        )
    }
}