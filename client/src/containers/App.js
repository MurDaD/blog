import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Admin from './../containers/Admin';
import PostsList from './PostsList';
import AddPost from './AddPost';

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <Router>
                            <div className="col-sm-8 blog-main">
                                <Route exact path="/" component={PostsList}/>
                                <Route path="/admin" component={AddPost}/>
                            </div>
                        </Router>
                        <div className="col-sm-3 offset-sm-1 blog-sidebar">
                            <Sidebar />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
