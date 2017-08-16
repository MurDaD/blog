import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

const postsApi = require('./../actions').posts;

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * Send API request to add new post
     */
    createPost() {
        postsApi.createPost(this.state)
            .then(result => {
                console.dir(result);
            })
            .catch(error => {
                console.dir(error);
                // this.serProps
            })
    }

    /**
     * Handle regular fields change (except editor)
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

    /**
     * Handle editor change and convert result to html
     * @param editorContent
     */
    onEditorChange(editorContent) {
        this.setState({
            description: draftToHtml(editorContent)
        });
    };

    /**
     * Render api response error
     * @param error
     */
    renderError(error) {

    }

    render() {
        return (
            <div>
                <h1>Add a new Post</h1>
                { this.renderError(this.props.error) }
                <form>
                    <FormGroup
                    controlId="formBasicText"
                    // validationState={this.getValidationState()}
                >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        name="title"
                        value={this.state.title}
                        placeholder="What is your article about"
                        onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Minimuim 7 to maximum 70 characters.</HelpBlock>
                </FormGroup>
                    <FormGroup
                        controlId="formBasicText"
                        // validationState={this.getValidationState()}
                    >
                        <ControlLabel>What is your name?</ControlLabel>
                        <FormControl
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleChange.bind(this)}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Minimum 7 to maximum 70 characters.</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Description</ControlLabel>
                        <Editor
                            name="description"
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            value={this.state.description}
                            onChange={this.onEditorChange.bind(this)}
                        />
                    </FormGroup>
                    <Button onClick={this.createPost.bind(this)}>
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default AddPost;
