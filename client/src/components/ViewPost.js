import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchPost } from '../actions/postActions'
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

    render() {

        const { title, author, description, content, createdAt, updatedAt } = this.props.post

        return (
            <div className="view-post">
                <h1 className="viewpost-title">{title}</h1>
                <p>Author: {author}</p>
                <p>Last updated at: {updatedAt}</p>
                <p>Created at: {createdAt}</p>
                <h3>Description: {description}</h3>
                <p>{content}</p>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    post: state.posts.item
})

export default connect(mapStateToProps, { fetchPost })(ViewPost)
