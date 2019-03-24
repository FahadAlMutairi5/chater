import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channelsNotification:[],
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
         /* -- set channel from api -- */
    case actionTypes.SET_CHANNELS_NOTIFCATION:
      return {
        ...state,
        channelsNotification: action.payload, 
      };
    default:
    return state;
  }
};
export default reducer;