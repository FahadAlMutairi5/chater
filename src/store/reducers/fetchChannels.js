import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels:[],
  loading:true,
  filteredChannels: [],
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
         /* -- set channel from api -- */
    case actionTypes.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        filteredChannels:action.payload,
        loading:false,
      };
          /* -- set channel from create channel form -- */
    case actionTypes.CREATE_CHANNEL:
      return {
          ...state,
         channels: state.channels.concat(action.payload),
         filteredChannels:state.filteredChannels.concat(action.payload),
    };
        /* -- set felter channel after res -- */
    case actionTypes.FILTER_CHANNELS:
      return {
        ...state,
        filteredChannels: state.channels.filter(channel => {
          return `${channel.name}`
            .toLowerCase()
            .includes(action.payload);
      })
    };
        /* -- set loading when fitch channel -- */
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