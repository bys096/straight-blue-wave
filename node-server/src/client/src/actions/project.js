import { PROJECT_CONNECT, PROJECT_EXIT } from './types.js';

export function projectConnect(team) {
    return {
        type: PROJECT_CONNECT,
        payload: team
    };
}

export function projectExit() {
    return {
        type: PROJECT_EXIT
    };
}