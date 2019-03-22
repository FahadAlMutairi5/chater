import * as actionTypes from "../actions/actionTypes";

const initialState = {
  masseges:[],
  loading:true,
  newMessages:false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        masseges: action.payload,
        loading:false,
      };
      case actionTypes.SET_MESSAGES_TIME_STAMP:
      if (action.payload.length >= 1){
        return {
        ...state,
        masseges: state.masseges.concat(action.payload),
        newMessages:true
      };
      }
      return {
        ...state,
        masseges: state.masseges.concat(action.payload),
      };
      case actionTypes.SET_MESSAGES_LOADING:
      return {
        ...state,
        loading: true
      };
      default:
      return state;
  }
};


export default reducer;