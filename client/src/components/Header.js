import React, { Component } from 'react';
import Menu from './Menu';

class Header extends Component {

    render() {
        return (
            <div className="blog-masthead">
                <Menu />
            </div>
        );
    }
}

export default Header;
