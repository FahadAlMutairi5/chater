import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import fetchChannels from "./fetchChannels";
import fetchMessages from "./fetchMessages";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  channels:fetchChannels,
  mess:fetchMessages,
});
