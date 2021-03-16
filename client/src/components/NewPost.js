import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, fetchPost, editPost } from '../actions/postActions'
import PropTypes from 'prop-types'
import './styles/NewPost.css'

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

    async componentDidMount() {
        if(this.props.match.params.id) {
            await this.props.fetchPost(this.props.match.params.id)
            this.setState(this.props.item)
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const author = this.props.user.name
        const email = this.props.user.email
        const title = e.target.title.value
        const description = e.target.description.value
        const content = e.target.content.value

        const entries = { author, email, title, description, content }


        try {
            if(this.props.match.params.id) {
                await this.props.editPost(entries, this.props.match.params.id)
            } else {
                await this.props.addPost(entries)
            }
    
            const state = { ...this.props.item, author, email, title, description, content }
            this.props.history.push({ pathname: '/view/' + this.props.match.params.id, state })
        } catch(error) {
            this.setState(error)
        }
    }

    render() {

        const { title, description, content, errorMessage } = this.state

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
                    { errorMessage.title == null ? null : (<div className="error-message">{errorMessage.title}</div>) }
                    <input type="text" name="description" defaultValue={description} placeholder="Description" autoComplete="off" />
                    { errorMessage.description == null ? null : (<div className="error-message">{errorMessage.description}</div>) }
                    <textarea type="text" name="content" defaultValue={content} placeholder="Content"></textarea>
                    { errorMessage.content == null ? null : (<div className="error-message">{errorMessage.content}</div>) }
                    <button>Submit</button>
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
