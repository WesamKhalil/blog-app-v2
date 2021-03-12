import { FETCH_POSTS, NEW_POST } from '../actions/types'

const initialState = {
    items: ["initial post"]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                items: action.payload
            }
        default:
            return state
    }
}