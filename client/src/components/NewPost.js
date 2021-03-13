import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, fetchPost, editPost } from '../actions/postActions'
import PropTypes from 'prop-types'
import './styles/NewPost.css'

export class NewPost extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        id: PropTypes.string,
        addPost: PropTypes.func,
        fetchPost: PropTypes.func
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const author = this.props.name
        const title = e.target.title.value
        const description = e.target.description.value
        const content = e.target.content.value

        const entries = { author, title, description, content }

        if(this.props.match.params.id) {
            await this.props.editPost(entries, this.props.match.params.id)
        } else {
            await this.props.addPost(entries)
        }

        this.props.history.push('/view/' + this.props.id)
    }

    render() {
        if(!this.props.loggedIn) return (
            <div className="message-login">
                <h1>Login to make a post.</h1>
            </div>
        )

        return (
            <div className="post-form">
                <h1 className="form-title">Create a new post.</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" defaultValue={this.props.post.title} placeholder="Title" autoComplete="off" />
                    <input type="text" name="description" defaultValue={this.props.post.description} placeholder="Description" autoComplete="off" />
                    <textarea type="text" name="content" defaultValue={this.props.post.content} placeholder="Content"></textarea>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    name: state.auth.user.name,
    id: state.posts.item._id,
    post: state.posts.item
})

export default connect(mapStateToProps, { addPost, fetchPost, editPost })(NewPost)
