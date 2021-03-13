import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './styles/NewPost.css'

export class NewPost extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool
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
                <form>
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
    loggedIn: state.auth.loggedIn
})

export default connect(mapStateToProps)(NewPost)
