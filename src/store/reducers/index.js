import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import fetchChannels from "./fetchChannels";
import fetchMessages from "./fetchMessages";
import fetchChannelsNotif from "./FitchNotification";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  channels:fetchChannels,
  mess:fetchMessages,
  fetchChannelsNotif:fetchChannelsNotif
});
