import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, LOAD_USER_SUCCESS } from '../actions/types'

const initialState = {
    loggedIn: null,
    user: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: { ...(action.payload) }
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: null,
                user: {}
            }
        default:
            return state
    }
}