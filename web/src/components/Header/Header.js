import React, {Component} from 'react';
import {AppBar} from 'material-ui';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <AppBar title="Kurento monitor" iconElementLeft={<span></span>}/>
        );
    }
}

export default Header;
