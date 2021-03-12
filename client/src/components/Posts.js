import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
import PropTypes from 'prop-types'

export class Posts extends Component {
    render() {
        return (
            <div>
                <h1>Posts</h1>
                <button onClick={this.props.fetchPosts}>fetch post</button>
                {this.props.posts.map((post, ind) => (<p key={"posts" + ind}>{post}</p>))}
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(Posts)
