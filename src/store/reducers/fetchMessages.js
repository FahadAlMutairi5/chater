import * as actionTypes from "../actions/actionTypes";

const initialState = {
  masseges:[],
  loading:true,
  newMessages:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
        /* -- set all message for one channel from api  -- */
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        masseges: action.payload,
        loading:false,
      };
        /* -- set new message for one channel from api by time stamp -- */
      case actionTypes.SET_MESSAGES_TIME_STAMP:
        return {
        ...state,
        masseges: state.masseges.concat(action.payload),
        newMessages:action.payload

      };
        /* -- set loading true when fitch messages -- */
      case actionTypes.SET_MESSAGES_LOADING:
      return {
        ...state,
        loading: true
      };
        /* -- after show notification rest newmessages to empty array -- */
      case actionTypes.RESET_MESSAGES_NOTIFICATION:
      return {
        ...state,
        newMessages: []
      };
      default:
      return state;
  }
};


export default reducer;