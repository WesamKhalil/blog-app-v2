import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from '../actions/types'

const initialState = {
    loggedIn: true,
    user: {name: 'John Doe'}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: null,
                user: null
            }
        default:
            return state
    }
}