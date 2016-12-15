import React, { Component, PropTypes } from 'react'
import Navbar from '../containers/Navbar'
import ComboBox from '../components/ComboBox'
/**
 * 
 */
export default class MapNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar >
                <ul className="nav navbar-nav">
                    <li><a href="#">Link</a></li>
                </ul>
                <form className="navbar-form navbar-left" role="search">
                    <ComboBox dataProvider={['谷歌地图','百度地图','天地图','高德地图','腾讯地图','必应地图']} />
                </form>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                </ul>
            </Navbar>)
    }
}
