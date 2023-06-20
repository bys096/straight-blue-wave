import { TEAM_CONNECT, TEAM_EXIT } from "./types.js";

export function teamConnect(team) {
	return {
		type: TEAM_CONNECT,
		payload: team,
	};
}
export function teamExit() {
	return {
		type: TEAM_EXIT,
	};
}
