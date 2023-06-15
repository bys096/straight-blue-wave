import { BOARD_CONNECT, BOARD_EXIT } from './types.js';

export function boardConnect(board) {
    return {
        type: BOARD_CONNECT,
        payload: board
    };
}

export function boardExit() {
    return {
        type: BOARD_EXIT
    };
}