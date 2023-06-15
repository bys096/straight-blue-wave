import { combineReducers } from "redux";
import authReducer from "./auth";
import teamReducer from "./team";
import projectReducer from "./project";
import postReducer from "./auth";
import boardReducer from "./auth";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
	applyMiddleware,
	compose,
	legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const enhancer =
	process.env.NODE_ENV === "production"
		? compose(applyMiddleware())
		: composeWithDevTools(applyMiddleware(logger));

const rootReducer = combineReducers({
	authReducer,
	projectReducer,
	teamReducer,
	postReducer,
	boardReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancer);

export default store;
