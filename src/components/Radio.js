/**
 * @author gyb(mocheer) 
 * @email mocheer@foxmail.com
 * @since 2016.3.24
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
            selIndex: 0,
            checked: props.checked
        }

        props.group.push(this)
    }
    /**
     * 单个radio change
     */
    handleChange(e) {
        let { props, state } = this;
        if (!state.checked) {
            props.group.forEach(item => {
                item.setState({ checked: item === this })
            })
            props.onChange && props.onChange({ target: this, checked: true })
        }
    }
    /**
     * 
     */
    render() {
        let { props, state } = this,
            { label, dataProvider, onChange } = props,
            { checked } = state,
            content;
        //
        if (dataProvider) {
            content = dataProvider.map(item => {
                let { label, checked } = item;
                return (
                    <label style={{ marginRight: 5, marginLeft: 5 }}  >
                        <input type="radio" checked={checked} onChange={e => {
                            dataProvider.forEach(data => {
                                data.checked = data === item;
                            })
                            onChange && onChange({ target: this, selItem: item })
                            this.forceUpdate();
                        }} />
                        {label}
                    </label>
                )
            })
        } else {
            content = (
                <label>
                    <input type="radio" checked={checked} onChange={this.handleChange.bind(this)} />
                    {label}
                </label>
            )
        }
        // defaultChecked={checked} 
        return (
            <div className="Radio radio" style={Object.assign({ display: 'inline', marginRight: 2 }, props.style)} >
                {content}
            </div>
        )
    }
}

Radio.defaultProps = {
    group: []
}