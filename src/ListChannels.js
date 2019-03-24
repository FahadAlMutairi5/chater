import React, { Component } from 'react';
import { connect } from "react-redux";
import Channel from "./Channel";
import Loading from './Loading';
import GoodBye from './GoodBye';
import * as actionCreators from "./store/actions";
//import axios from "axios";

    /* -- get List of all channels component -- */

class ListChannels extends Component {
  async componentDidMount() {
     if (this.props.user){
      await this.props.fetchChannels() //fetch all Channels from API
      /* -- try to do notification of all channels in app  -- */
    //   let setIntervals = [];
    //   const message = []; 
    // if (this.props.channels.length >=1){
    //     const channels = this.props.channels; 
    //    channels.forEach( chaannel => {
    //       let prom = this.props.fetchMessagesNoti(chaannel.id)
    //       console.log("*********************")
    //       console.log(prom);
    //   });
    // }
  }
  }
      /* -- on Update componint -- */
  componentDidUpdate(){
  
  }
      /* -- get all Channel component -- */
  getChannels = () => {
    return this.props.filteredChannels.map(channel => (
      <Channel key={channel.id} channel={channel} />
    ));
    
  }
  render() {
    const channels = this.getChannels();

    if (this.props.user){
      return (
        <div className="animated slideInRight col-6 my-3 shadow rounded text-center" style={{backgroundColor:"rgba(170,175,179,0.4)"}}>
          <div className="col-12 mt-2">  
            <div className="input-group text-center">
              <input 
              type="text" 
              className="form-control rounded-pill mt-2" 
              placeholder="Search .." 
              aria-label="Search .."
              onChange={event => this.props.onSearch(event.target.value)}
              aria-describedby="basic-addon1"/>
            </div>
          </div>
          <hr className="border border-light" />
          <div className="col-12 overflow-auto text-center" style={{height: "28rem"}}>
          { this.props.loading ?
            <div className="col-6 offset-3">  
            <div className="spinner mx-auto text-center">
            <br/><br/><br/><br/>
            <Loading/>
            </div>
            </div> :
             channels
          }
          </div>
        </div>
    );
    }else{
      return (
        <GoodBye/>
      );
    }
    
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user, 
    channels: state.channels.channels,
    filteredChannels: state.channels.filteredChannels,
    messages: state.mess.masseges, 
    loading:state.channels.loading, 
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearch: query => dispatch(actionCreators.filterChannels(query.toLowerCase())),
    fetchChannels: () => dispatch(actionCreators.fetchChannels()),
    fetchMessagesNoti:(channelId) => dispatch(actionCreators.fetchMessagesNoti(channelId)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(ListChannels);
