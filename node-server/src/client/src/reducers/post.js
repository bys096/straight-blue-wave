import { POST_CONNECT, POST_EXIT } from '../actions/types.js';

const initialState = {
    isConnected: false,
    post: null
};

export default function teamReducer(state = initialState, action) {
    switch (action.type) {
        case POST_CONNECT:
            return {
                ...state,
                isConnected: true,
                post: action.payload
            };
        case POST_EXIT:
            return {
                ...state,
                isConnected: false,
                post: null
            };
        default:
            return state;
    }
}