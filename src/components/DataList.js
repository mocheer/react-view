/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
/**
 * 
 * 
 */
export default class DataList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // dataProvider: this.props.dataProvider
        };
    }
    /**
     * 渲染
     */
    render() {
        let { props, state } = this,
            { dataProvider, onClick } = props,
            dataRows;
        if (dataProvider) {
            dataRows = dataProvider.map(function (data) {
                if (typeof data !== "string") {
                    data = data.label;
                }
                return <a role='button' className="list-group-item" onClick={e => {
                    onClick && onClick()
                }}>{dataLabel}</a>
            });
        }
        return (
            <div className="list-group">
                {dataRows}
            </div>
        );
    }
}