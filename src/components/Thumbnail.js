/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React,{Component,PropTypes} from 'react'
//TODO
export default class thumbnail extends Component{
    constructor(props) {
         super(props)
         this.state = {
             img:props.img,
             caption:props.caption,
             text:props.text,
             buttons:null
        }
    }
    render(){
         return (
            <div className="thumbnail">
                <img src="..." alt="..." ></img>
                <div className="caption">
                    <h3>{this.state.caption}</h3>
                    <p>{this.state.text}</p>
                    <p>
                        <a href="javascript:void(0)" className="btn btn-primary" role="button">Button</a> 
                        <a href="javascript:void(0)" className="btn btn-default" role="button">Button</a>
                   </p>
                </div>
            </div>
         );
     }
}