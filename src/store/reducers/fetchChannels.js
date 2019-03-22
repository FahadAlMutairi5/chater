import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels:[],
  loading:true,
  filteredChannels: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        filteredChannels:action.payload,
        loading:false,
      };
    case actionTypes.CREATE_CHANNEL:
      return {
          ...state,
         channels: state.channels.concat(action.payload),
    };
    case actionTypes.FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`
            .toLowerCase()
            .includes(action.payload);
      })
    };
    case actionTypes.SET_CHANELS_LOADING:
      return {
        ...state,
        loading: true
    };
    default:
    return state;
  }
};


export default reducer;