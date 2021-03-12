import { FETCH_POSTS, NEW_POST } from './types'

export const fetchPosts = () => dispatch => {
    //asynchronous function here
    dispatch({
        type: FETCH_POSTS,
        payload: ["Hello world!"]
    })
}

// export function fetchPosts() {
//     return function(dispatch) {
//         dispatch({
//             type: FETCH_POSTS,
//             payload: ["Hello world!"]
//         })
//     }
// }