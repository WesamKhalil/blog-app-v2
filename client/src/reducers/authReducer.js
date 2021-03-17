import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, LOAD_USER_SUCCESS, LOGIN_FAILED, REGISTER_FAILED } from '../actions/types'

//loggedIn value to determine whether to render user elements.
//User object which will have a name and email value, email is used to determine which posts are yours and render edit and delete buttons for that post.
//errorMessages which will hold error messages we display for our login and register form.
const initialState = {
    loggedIn: null,
    user: {},
    errorMessages: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: { ...(action.payload) },
                errorMessages: {}

            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: null,
                user: {}
            }
        case LOGIN_FAILED:
        case REGISTER_FAILED:
            return {
                ...state,
                errorMessages: action.payload
            }
        default:
            return state
    }
}