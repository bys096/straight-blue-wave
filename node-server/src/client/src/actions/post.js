import { POST_CONNECT, POST_EXIT } from './types.js';

export function postConnect(post) {
    return {
        type: POST_CONNECT,
        payload: post
    };
}

export function postExit() {
    return {
        type: POST_EXIT
    };
}