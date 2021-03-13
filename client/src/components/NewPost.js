import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions/postActions'
import PropTypes from 'prop-types'
import './styles/NewPost.css'

export class NewPost extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        id: PropTypes.string
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const author = this.props.name
        const title = e.target.title.value
        const description = e.target.description.value
        const content = e.target.content.value

        console.log(author, title, description, content)

        const entries = { author, title, description, content }

        await this.props.addPost(entries)

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
                    <input type="text" name="title" placeholder="Title" autoComplete="off" />
                    <input type="text" name="description" placeholder="Description" autoComplete="off" />
                    <textarea type="text" name="content" placeholder="Content"></textarea>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    name: state.auth.user.name,
    id: state.posts.item._id
})

export default connect(mapStateToProps, { addPost })(NewPost)
