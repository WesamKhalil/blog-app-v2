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
    console.log(tokenConfig())
    const post = (await axios.post('/api/post/add', entries, tokenConfig())).data
    dispatch({
        type: NEW_POST,
        payload: post
    })
}

export const deletePost = id => async (dispatch, getState) => {
    await axios.delete('/api/post/delete/' + id, tokenConfig())
    const items = getState().posts.items.filter(post => post._id !== id)
    dispatch({
        type: DELETE_POST,
        payload: items
    })
}

export const editPost = (entries, id) => async (dispatch) => {
    console.log('edit action', entries, id)
    const post =  (await axios.put('/api/post/edit/' + id, entries, tokenConfig())).data
    console.log('action', post)
    dispatch({
        type: EDIT_POST,
        payload: post
    })
}

const tokenConfig = () => {
    const token = localStorage.getItem('jwt')
    if(!token) return {}
    return {
        headers: {
            "x-auth-token": token
        }
    }
}