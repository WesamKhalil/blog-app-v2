import { FETCH_POSTS, NEW_POST, FETCH_POST, DELETE_POST, EDIT_POST } from '../actions/types'

//Items is an array of post objects that we render on the index page in the Post component.
//Item is a single post that you see when you look at a specific post or edit a post.
//errorMessages which will hold error messages we display for our login and register form.
const initialState = {
    items: [],
    item: {},
    errorMessages: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
        case DELETE_POST:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_POST:
        case NEW_POST:
        case EDIT_POST:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state
    }
}