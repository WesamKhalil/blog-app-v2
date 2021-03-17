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

    //Load single post and put it in local state.
    async componentDidMount() {
        if(this.props.location.state) return this.setState(this.props.location.state)
        await this.props.fetchPost(this.props.match.params.id)
        this.setState(this.props.post)
    }

    //Function for delete this post.
    handleDelete = async (id) => {
        await this.props.deletePost(id)

        this.props.history.push('/')
    }

    render() {

        const {  _id, title, author, description, content, createdAt, updatedAt, userPostsId } = this.state
        console.log('view post userpostsid', userPostsId)

        return (
            <div className="view-post">
                <h1 className="viewpost-title">{title}</h1>
                <h3>Author: {author}</h3>
                <h3>Description: {description}</h3>
                <div className="viewpost-dates">
                    <p>Last updated at: { updatedAt?.slice(0, 10) + ' ' + updatedAt?.slice(11, 19) }</p>
                    <p>Created at: {createdAt?.slice(0, 10) + ' ' + createdAt?.slice(11, 19)}</p>
                </div>
                <div className="display-linebreak">{content}</div>
                <div className="view-post-buttons">
                    { userPostsId === this.props.user?.userPostsId ? <EditDele id={_id} deletePost={() => this.props.deletePost(_id)} /> : null }
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
