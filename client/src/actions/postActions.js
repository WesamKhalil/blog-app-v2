import { FETCH_POSTS, NEW_POST, FETCH_POST, DELETE_POST, EDIT_POST } from './types'
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
    dispatch({
        type: FETCH_POST,
        payload: post
    })
}

export const addPost = entries => async (dispatch) => {
    const post = (await axios.post('/api/post/add', entries)).data
    dispatch({
        type: NEW_POST,
        payload: post
    })
}

export const deletePost = id => async (dispatch, getState) => {
    await axios.delete('/api/post/delete/' + id)
    const items = getState().posts.items.filter(post => post._id !== id)
    dispatch({
        type: DELETE_POST,
        payload: items
    })
}

export const editPost = (entries, id) => async (dispatch) => {
    const post = await (axios.put('/api/post/edit/' + id, entries))
    dispatch({
        type: EDIT_POST,
        payload: post.data
    })
}