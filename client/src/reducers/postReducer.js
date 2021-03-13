import { FETCH_POSTS, NEW_POST, FETCH_POST, DELETE_POST } from '../actions/types'

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
        case NEW_POST:
        case FETCH_POST:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state
    }
}