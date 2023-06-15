import { TEAM_CONNECT, TEAM_EXIT } from "../actions/types.js";

const initialState = {
	isConnected: false,
	team: null,
	teamImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
};

export default function teamReducer(state = initialState, action) {
	switch (action.type) {
		case TEAM_CONNECT:
			return {
				...state,
				isConnected: true,
				team: action.payload,
			};
		case TEAM_EXIT:
			return {
				...state,
				isConnected: false,
				team: null,
			};

		default:
			return state;
	}
}
