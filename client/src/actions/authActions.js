import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, LOAD_USER_SUCCESS, LOGIN_FAILED, REGISTER_FAILED } from './types'
import axios from 'axios'

//Action for logging in.
export const login = (email, password) => async (dispatch) => {
    try {
        const { name, token } = (await axios.post('/api/user/login', { email, password })).data
        localStorage.setItem('jwt', token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { name, email }
        })
    } catch(error) {
        throw error.response.data
    }
}

//Action for registering.
export const register = (name, email, password) => async (dispatch) => {
    try {
        const { token } = (await axios.post('/api/user/register', { name, email, password })).data
        localStorage.removeItem('jwt')
        localStorage.setItem('jwt', token)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { name, email }
        })
    } catch(error) {
        throw error.response.data
    }
}

//Action for logging out.
export const logout = () => dispatch => {
    localStorage.removeItem('jwt')
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

//Action for loading user.
export const loadUser = () => async (dispatch) => {
    const { name, email } = (await axios.post('/api/user/load', {}, tokenConfig())).data
    dispatch({
        type: LOAD_USER_SUCCESS,
        payload: { name, email }
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