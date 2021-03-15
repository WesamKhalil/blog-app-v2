import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, LOAD_USER_SUCCESS } from './types'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    const { name, token } = (await axios.post('/api/user/login', { email, password })).data
    localStorage.setItem('jwt', token)
    dispatch({
        type: LOGIN_SUCCESS,
        payload: { name, email }
    })
}

export const register = (name, email, password) => async (dispatch) => {
    const { token } = (await axios.post('/api/user/register', { name, email, password })).data
    localStorage.removeItem('jwt')
    localStorage.setItem('jwt', token)
    dispatch({
        type: REGISTER_SUCCESS,
        payload: { name, email }
    })
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwt')
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

export const loadUser = () => async (dispatch) => {
    const { name, email } = (await axios.post('/api/user/load', {}, tokenConfig())).data
    dispatch({
        type: LOAD_USER_SUCCESS,
        payload: { name, email }
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