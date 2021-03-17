import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, fetchPost, editPost } from '../actions/postActions'
import PropTypes from 'prop-types'
import './styles/NewPost.css'

//Form for creating and editing existing posts.
export class NewPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            content: '',
            errorMessage: {}
        }
    }

    static propTypes = {
        loggedIn: PropTypes.bool,
        id: PropTypes.string,
        addPost: PropTypes.func,
        fetchPost: PropTypes.func
    }

    //If this component is used for editing then we load the document/post to be edited and put it in local state.
    async componentDidMount() {
        if(this.props.match.params.id) {
            await this.props.fetchPost(this.props.match.params.id)
            this.setState(this.props.item)
        }
    }

    //Handles submitting a new or edited post, then redirects to the '/view' route to view said post.
    handleSubmit = async (e) => {
        e.preventDefault()

        const author = this.props.user.name
        const title = e.target.title.value
        const description = e.target.description.value
        const content = e.target.content.value
        const userPostsId = this.props.user.userPostsId

        const entries = { author, title, description, content, userPostsId }


        try {
            if(this.props.match.params.id) {
                await this.props.editPost(entries, this.props.match.params.id)
            } else {
                await this.props.addPost(entries)
            }
    
            const state = { ...this.props.item, author, title, description, content }
            this.props.history.push({ pathname: '/view/' + this.props.item._id, state })
        } catch(error) {
            this.setState(error)
        }
    }

    render() {

        const { title, description, content, errorMessage } = this.state

        //Elements to be rendered if user is not logged in as non users can't create/edit posts.
        if(!this.props.loggedIn) return (
            <div className="message-login">
                <h1>Login to make a post.</h1>
            </div>
        )

        return (
            <div className="post-form">
                <h1 className="form-title">Create a new post.</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" defaultValue={title} placeholder="Title" autoComplete="off" />

                    <input type="text" name="description" defaultValue={description} placeholder="Description" autoComplete="off" />

                    <textarea type="text" name="content" defaultValue={content} placeholder="Content"></textarea>
                    
                    <button>Submit</button>
                    { errorMessage.title == null ? null : (<div className="error-message">{errorMessage.title}</div>) }
                    { errorMessage.description == null ? null : (<div className="error-message">{errorMessage.description}</div>) }
                    { errorMessage.content == null ? null : (<div className="error-message">{errorMessage.content}</div>) }
                    { errorMessage.general == null ? null : (<div className="error-message">{errorMessage.general}</div>) }
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    item: state.posts.item
})

export default connect(mapStateToProps, { addPost, fetchPost, editPost })(NewPost)
