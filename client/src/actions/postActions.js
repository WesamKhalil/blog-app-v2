import { FETCH_POSTS, NEW_POST, FETCH_POST } from './types'
import axios from 'axios'

export const fetchPosts = () => async (dispatch) => {
    const posts = (await axios.get('/api/post/all')).data.posts
    dispatch({
        type: FETCH_POSTS,
        payload: posts
    })
}

export const fetchPost = id => async (dispatch) => {
    const post = (await axios.get('/api/post/single/' + id)).data
    console.log(post)
    dispatch({
        type: FETCH_POST,
        payload: post
    })
}