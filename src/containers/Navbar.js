import React, { Component, PropTypes } from 'react'
/**
 * props{title,content,footer}
 */
export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    createHader() {

    }

    createLeft() {

    }

    createRight() {

    }

    render() {
        let {props, state} = this,
            {height, children} = props
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Gis</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        {children}
                    </div>

                </div>
            </nav>
        );
    }
}