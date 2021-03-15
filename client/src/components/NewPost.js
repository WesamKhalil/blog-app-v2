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
            content: ''
        }
    }

    static propTypes = {
        loggedIn: PropTypes.bool,
        id: PropTypes.string,
        addPost: PropTypes.func,
        fetchPost: PropTypes.func
    }

    async componentDidMount() {
        await this.props.fetchPost(this.props.match.params.id)
        console.log('component', this.props.item)
        const { title, description, content } = this.props.item

        if(this.props.match.params.id) this.setState({title, description, content})
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const author = this.props.user.name
        const email = this.props.user.email
        const title = e.target.title.value
        const description = e.target.description.value
        const content = e.target.content.value

        const entries = { author, email, title, description, content }

        if(this.props.match.params.id) {
            await this.props.editPost(entries, this.props.match.params.id)
        } else {
            await this.props.addPost(entries)
        }

        if(this.props.match.path === '/edit/:id' || this.props.match.path === '/new') {
            const state = { ...this.props.item, author, email, title, description, content }
            this.props.history.push({ pathname: '/view/' + this.props.match.params.id, state })
        } else {
            this.props.history.push('/view/' + this.props.match.params.id)
        }
    }

    render() {

        let { title, description, content } = this.state

        if(!this.props.match.params.id) title, description, content = null

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
