import { PROJECT_CONNECT, PROJECT_EXIT } from '../actions/types.js';

const initialState = {
    isConnected: false,
    project: null
};

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case PROJECT_CONNECT:
            return {
                ...state,
                isConnected: true,
                project: action.payload
            };
        case PROJECT_EXIT:
            return {
                ...state,
                isConnected: false,
                project: null
            };
        default:
            return state;
    }
}