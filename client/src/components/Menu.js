import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (
            <div className="container">
                <nav className="nav blog-nav">
                    <a className="nav-link" href="/">Home</a>
                    <a className="nav-link" href="/admin">Add post</a>
                </nav>
            </div>
        );
    }
}

export default Menu;
