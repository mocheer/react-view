/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @param date 2016.3.24
 */
import React, { Component, PropTypes } from 'react'
// import classNames from 'classnames'
/**
 * 
 */
export default class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
        props.group.push(this)
    }
    /**
     * 
     */
    handleChange(e) {
        let { props, state } = this;
        if (state.checked === true) {
            return;
        }
        props.group.forEach(item => {
            if (item !== this) {
                item.setState({ checked: false })
            }
        })
        this.setState({ checked: true })
        props.onChange && props.onChange({ target: this, checked: true })
    }
    /**
     * 
     */
    render() {
        let { props, state } = this,
            { label, dataProvider } = props,
            { checked } = state,
            content;
        //todo 暂未完成
        if (dataProvider) {
            content = dataProvider.map(item => {
                let { label, checked } = item;
                return (
                    <label>
                        <input type="radio" checked={checked} />
                        {label}
                    </label>
                )
            })
        } else {
            content = (
                <label>
                    <input type="radio" checked={checked} />
                    {label}
                </label>
            )

        }
        // defaultChecked={checked} 
        return (
            <div className="radio" style={Object.assign({ display: 'inline', marginRight: 2 }, props.style)} onClick={this.handleChange.bind(this)} >
                {content}
            </div>
        )
    }
}

Radio.defaultProps = {
    group: []
}