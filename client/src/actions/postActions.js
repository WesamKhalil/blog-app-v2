import { FETCH_POSTS, NEW_POST, FETCH_POST, DELETE_POST, EDIT_POST } from './types'
import axios from 'axios'

//Fetches multiple posts in a paginated like fashion, intially loading 5 posts.
export const fetchPosts = (page, limit) => async (dispatch, getstate) => {
    const newPosts = (await axios.get(`/api/post/?page=${page}&limit=${limit}`)).data.posts
    let oldPosts = []
    if(page > 1) oldPosts = getstate().posts.items
    dispatch({
        type: FETCH_POSTS,
        payload: oldPosts.concat(newPosts)
    })
}

//Fetches a single post for viewing or editing.
export const fetchPost = id => async (dispatch) => {
    const post = (await axios.get('/api/post/single/' + id)).data
    dispatch({
        type: FETCH_POST,
        payload: post
    })
}

//Action for creating a new post.
export const addPost = entries => async (dispatch) => {
    try {
        const post = (await axios.post('/api/post/add', entries, tokenConfig())).data
        dispatch({
            type: NEW_POST,
            payload: post
        })
    } catch(error) {
        throw error.response.data
    }
}

//Action for updating and edited post.
export const editPost = (entries, id) => async (dispatch) => {
    try {
        const post =  (await axios.put('/api/post/edit/' + id, entries, tokenConfig())).data
        dispatch({
            type: EDIT_POST,
            payload: post
        })
    } catch(error) {
        throw error.response.data
    }
}

//Action for deleting a post.
export const deletePost = id => async (dispatch, getState) => {
    await axios.delete('/api/post/delete/' + id, tokenConfig())
    const items = getState().posts.items.filter(post => post._id !== id)
    dispatch({
        type: DELETE_POST,
        payload: items
    })
}

//function for creating headers configuration to put the users token inside for authorisation.
const tokenConfig = () => {
    const token = localStorage.getItem('jwt')
    if(!token) return {}
    return {
        headers: {
            "x-auth-token": token
        }
    }
}