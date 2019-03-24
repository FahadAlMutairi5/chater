import * as actionTypes from "./actionTypes";

import axios from "axios";
const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});
/* -- Set Loading -- */
const setLoading = () => ({
  type: actionTypes.SET_CHANELS_LOADING
});
// export const fetchChannelsNoti = () => {
//   return async dispatch => {
//     try {
//       const res = await instance.get("channels/");
//       const channels = res.data;
//       channels.forEach( async channel => {
//         let res = await instance.get(`channels/${channel.id}/`);
//         channel.message = res.data ;
//       })
//       dispatch({ type: actionTypes.SET_CHANNELS_NOTIFCATION, payload: channels });
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };
/* -- get channels from api  -- */
export const fetchChannels = () => {
  return async dispatch => {
    try {
      dispatch(setLoading())
      const res = await instance.get("channels/");
      const channels = res.data;
      channels.forEach( async channel => {
        let resmess = await instance.get(`channels/${channel.id}/`);
        channel.message = resmess.data ;
      })
      dispatch({ type: actionTypes.SET_CHANNELS, payload: channels });
    } catch (err) {
      console.error(err);
    }
  };
};
/* -- filter channels from api  -- */
export const filterChannels = query => {
  return {
    type: actionTypes.FILTER_CHANNELS,
    payload: query
  };
};