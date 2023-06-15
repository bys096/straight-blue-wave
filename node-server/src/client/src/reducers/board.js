import { BOARD_CONNECT, BOARD_EXIT } from '../actions/types.js';

const initialState = {
    isConnected: false,
    board: null
};

export default function teamReducer(state = initialState, action) {
    switch (action.type) {
        case BOARD_CONNECT:
            return {
                ...state,
                isConnected: true,
                board: action.payload
            };
        case BOARD_EXIT:
            return {
                ...state,
                isConnected: false,
                board: null
            };
        default:
            return state;
    }
}