import { FETCH_POSTS, NEW_POST, FETCH_POST, DELETE_POST, EDIT_POST } from './types'
import axios from 'axios'

export const fetchPosts = (page, limit) => async (dispatch) => {
    const posts = (await axios.get(`/api/post/?page=${page}&limit=${limit}`)).data.posts
    dispatch({
        type: FETCH_POSTS,
        payload: posts
    })
}

export const fetchMorePosts = (page, limit) => async (dispatch, getstate) => {
    const newPosts = (await axios.get(`/api/post/?page=${page}&limit=${limit}`)).data.posts
    const oldPosts = getstate().posts.items
    dispatch({
        type: FETCH_POSTS,
        payload: oldPosts.concat(newPosts)
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
    const post =  (await axios.put('/api/post/edit/' + id, entries, tokenConfig())).data
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