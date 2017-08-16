const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3001/api';

class Posts {
    /**
     * Get all posts
     */
    getPosts() {
        return axios({
            method: 'get',
            url: '/posts',
        })
            .then(result => {
                return result.data;
            })
    }

    /**
     * Add new post
     * @param data
     */
    createPost(data) {
        return axios({
            method: 'post',
            url: '/posts',
            data: data
        })
            .then(() => {
                return {};
            })
            .catch(error => {
                return error.message || error;
            })
    }
}

exports.posts = new Posts();