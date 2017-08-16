import React, { Component } from 'react';
const postsApi = require('./../actions').posts;

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        postsApi.getPosts()
            .then(posts => {
                console.dir(posts);
                this.setState({
                    posts: posts
                });
            })
            .catch(error => {
                console.dir(error);
            })
    }

    render() {
        return (
            <div classID="PostsList">
                {this.state.posts.map((article, i) =>
                    <div className="blog-post" key={i}>
                        <h2 className="blog-post-title">{article.title}</h2>
                        <p className="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>
                        <div dangerouslySetInnerHTML={{__html: article.description}} />
                    </div>
                )}
            </div>
        );
    }
}

export default PostsList;
