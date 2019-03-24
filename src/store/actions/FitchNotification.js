import * as actionTypes from "./actionTypes";

import axios from "axios";
const instance = axios.create({
           //https://api-chatr.herokuapp.com/
          //http://private-chatr.herokuapp.com/
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannelsNotification = () => {
  return async dispatch => {
    try {
      const res = await instance.get("channels/");
      const channels = res.data;
      let allChannelsAndMessages = [];
      channels.forEach( async channel => {
        let resmess = await instance.get(`channels/${channel.id}/`);
        let messagesForOneChannel = {channel:channel,messages:resmess.data} ;
        allChannelsAndMessages.concat(messagesForOneChannel);
      })
      dispatch({ type: actionTypes.SET_CHANNELS_NOTIFCATION, payload: allChannelsAndMessages });
    } catch (err) {
      console.error(err);
    }
  };
};