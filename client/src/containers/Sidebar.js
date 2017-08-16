import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.userLoggedIn = false;
    }

    /**
     * Handle login fields change
     * @param event
     */
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    login() {

    }

    greeting() {
        if(this.userLoggedIn) {
            return (
                <div className="sidebar-module sidebar-module-inset">
                    Hello, %username%.
                </div>
            )
        } else {
            return (
                <div className="sidebar-module sidebar-module-inset">
                    <h4>Login</h4>
                    <form>
                        <FormGroup
                            controlId="formBasicText"
                            // validationState={this.getValidationState()}
                        >
                            <FormControl
                                type="text"
                                name="login"
                                value={this.state.login}
                                placeholder="Name"
                                onChange={this.handleChange.bind(this)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            // validationState={this.getValidationState()}
                        >
                            <FormControl
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={this.handleChange.bind(this)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <Button onClick={this.login.bind(this)}>
                            Submit
                        </Button>
                    </form>
                    or <a href="/signup">SignUp</a>
                </div>
            )
        }
    }

    render() {
        return (
            <div classID="Sidebar">
                {this.greeting()}
                <div className="sidebar-module">
                    <h4>Archives</h4>
                    <ol className="list-unstyled">
                        <li><a href="#">March 2014</a></li>
                        <li><a href="#">February 2014</a></li>
                        <li><a href="#">January 2014</a></li>
                        <li><a href="#">December 2013</a></li>
                        <li><a href="#">November 2013</a></li>
                        <li><a href="#">October 2013</a></li>
                        <li><a href="#">September 2013</a></li>
                        <li><a href="#">August 2013</a></li>
                        <li><a href="#">July 2013</a></li>
                        <li><a href="#">June 2013</a></li>
                        <li><a href="#">May 2013</a></li>
                        <li><a href="#">April 2013</a></li>
                    </ol>
                </div>
                <div className="sidebar-module">
                    <h4>Elsewhere</h4>
                    <ol className="list-unstyled">
                        <li><a href="#">GitHub</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Facebook</a></li>
                    </ol>
                </div>
            </div>
        );
    }
}

export default Sidebar;
