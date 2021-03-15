import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/postActions'
import { EditDele } from './EditDele'
import PropTypes from 'prop-types'
import './styles/ViewPost.css'

export class ViewPost extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            title: '',
            author: '',
            email: '',
            description: '',
            content: '',
            createdAt: '',
            updatedAt: '',
            _id: 0 
        }
    }


    static propTypes = {
        post: PropTypes.object,
        fetchPost: PropTypes.func,
        user: PropTypes.object

    }

    async componentDidMount() {
        await this.props.fetchPost(this.props.match.params.id)
        this.setState(this.props.post)
    }

    handleDelete = async (id) => {
        await this.props.deletePost(id)

        this.props.history.push('/')
    }

    render() {

        const { title, author, email, description, content, createdAt, updatedAt, _id } = this.state

        return (
            <div className="view-post">
                <h1 className="viewpost-title">{title}</h1>
                <p>Author: {author}</p>
                <p>Last updated at: {updatedAt?.slice(0, 10)}</p>
                <p>Created at: {createdAt?.slice(0, 10)}</p>
                <h3>Description: {description}</h3>
                <p>{content}</p>
                <div className="view-post-buttons">
                    { email === this.props.user?.email ? <EditDele id={_id} deletePost={() => this.props.deletePost(_id)} /> : null }
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    post: state.posts.item,
    user: state.auth.user
})

export default connect(mapStateToProps, { fetchPost, deletePost })(ViewPost)
