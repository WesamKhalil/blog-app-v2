import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/postActions'
import { EditDele } from './EditDele'
import PropTypes from 'prop-types'
import './styles/ViewPost.css'

export class ViewPost extends Component {

    static propTypes = {
        post: PropTypes.object,
        fetchPost: PropTypes.func
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    handleDelete = async (id) => {
        await this.props.deletePost(id)

        this.props.history.push('/')
    }

    render() {

        const { title, author, description, content, createdAt, updatedAt, _id } = this.props.post

        return (
            <div className="view-post">
                <h1 className="viewpost-title">{title}</h1>
                <p>Author: {author}</p>
                <p>Last updated at: {updatedAt}</p>
                <p>Created at: {createdAt}</p>
                <h3>Description: {description}</h3>
                <p>{content}</p>
                <EditDele id={_id} deletePost={() => this.handleDelete(_id)} />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    post: state.posts.item
})

export default connect(mapStateToProps, { fetchPost, deletePost })(ViewPost)
