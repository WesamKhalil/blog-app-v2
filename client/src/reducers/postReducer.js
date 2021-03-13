import { FETCH_POSTS, NEW_POST, FETCH_POST, DELETE_POST, EDIT_POST } from '../actions/types'

const initialState = {
    items: [],
    item: {}
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