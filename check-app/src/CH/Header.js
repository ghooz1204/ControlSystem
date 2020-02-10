import React from 'react';
import logo from '../logo.svg';
import './Header.css'

class Header extends React.Component {
    render() {
        return (
            <header className={"App-header-"+this.props.type}>
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
        )
    }
}

export default Header;