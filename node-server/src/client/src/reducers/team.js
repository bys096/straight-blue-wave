import { TEAM_CONNECT, TEAM_EXIT } from '../actions/types.js';

const initialState = {
    isConnected: false,
    team: null
};

export default function teamReducer(state = initialState, action) {
    switch (action.type) {
        case TEAM_CONNECT:
            return {
                ...state,
                isConnected: true,
                team: action.payload
            };
        case TEAM_EXIT:
            return {
                ...state,
                isConnected: false,
                team: null
            };
        default:
            return state;
    }
}