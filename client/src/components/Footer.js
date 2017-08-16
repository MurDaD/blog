import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="blog-footer">
                <p>Blog template built for <a href="https://getbootstrap.com">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                <p>
                    <a href="#">Back to top</a>
                </p>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://v4-alpha.getbootstrap.com/examples/blog/blog.css"/>
            </footer>
        );
    }
}

export default Footer;
