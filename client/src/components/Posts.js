import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from '../actions/postActions'
import { EditDele } from './EditDele'
import PropTypes from 'prop-types'
import './styles/Posts.css'

export class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 1,
            limit: 5
        }
    }

    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired
    }

    //Fetch the first 5 initial posts.
    componentDidMount() {
        const { page, limit } = this.state
        this.props.fetchPosts(page, limit)
    }

    //Function for loading more posts.
    loadMorePosts = () => {
        this.setState(prevstate => ({ page: prevstate.page + 1 }))
        const { page, limit } = this.state
        this.props.fetchPosts(page + 1, limit)
    }

    render() {
        //Load items from the posts reducer and go through the array to render each one.
        return (
            <div className="posts-container">
                <h1 className="page-title">Posts</h1>
                {this.props.posts.map(({ _id, author, title, description, userPostsId }, ind) => (
                    <div key={"posts" + ind} className="post">
                        <div className="post-inner-box">
                            <h2 className="post-title">Title: {title}</h2>
                            <h3>Description: {description}</h3>
                            <p>Written by: {author}</p>
                            <p><Link to={"/view/" + _id}>Read more</Link></p>
                        </div>
                        <div className="post-buttons">
                            { userPostsId === this.props.user.userPostsId ? <EditDele id={_id} deletePost={() => this.props.deletePost(_id)} /> : null }
                        </div>
                    </div>
                ))}
                <div className="load-more">
                    <button onClick={this.loadMorePosts}>Load more posts</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    user: state.auth.user
})

export default connect(mapStateToProps, { fetchPosts, deletePost })(Posts)
