/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'

let defaultProps = {
    col: 1
}
/**
 * 
 */
export default class DataGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
    /**
     * 渲染
     */
    render() {
        let { props, state } = this,
            { dataProvider, render, rowCount, colCount } = props;
        if (!dataProvider) {
            return null;
        }
        let count = dataProvider.length,
            md = 12 / colCount,//目前支持4列
            colClassNames = `col-md-${md}`,
            dataRows = []
        //
        if (!rowCount) {
            rowCount = Math.ceil(count / colCount);
        }
        //
        for (let i = 0, row, col; i < rowCount; i++) {
            let cols = []
            for (let j = 0; j < colCount; j++) {
                cols.push(<div className={colClassNames} ></div>)
            }
            row = <div class="row">{cols}</div>
            dataRows.push(row)
        }

        return (
            <div className="container-fluid">
                {dataRows}
            </div>
        )
    }
}