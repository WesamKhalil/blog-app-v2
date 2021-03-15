import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from '../actions/postActions'
import { EditDele } from './EditDele'
import PropTypes from 'prop-types'
import './styles/Posts.css'

export class Posts extends Component {

    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        return (
            <div className="form-container">
                <h1 className="page-title">Posts</h1>
                {this.props.posts.map(({ author, email, title, description, _id }, ind) => (
                    <div key={"posts" + ind} className="post">
                        <h3 className="post-title">{title}</h3>
                        <p>Written by: {author}</p>
                        <h4>{description}</h4>
                        <p><Link to={"/view/" + _id}>Read more</Link></p>
                        { email === this.props.user.email ? <EditDele id={_id} deletePost={() => this.props.deletePost(_id)} /> : null }
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    user: state.auth.user
})

export default connect(mapStateToProps, { fetchPosts, deletePost })(Posts)
