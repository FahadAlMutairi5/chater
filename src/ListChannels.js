import React, { Component } from 'react';
import { connect } from "react-redux";
import Channel from "./Channel";
import ReactLoading from 'react-loading';
import logo from './assets/fat.png';
import Home from './Home';
import * as actionCreators from "./store/actions";

class ListChannels extends Component {
  componentDidMount() {
    this.props.fetchChannels()
  }
  componentDidUpdate(){

  }
  
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
            <ReactLoading type={"cylon"} color={"black"} height={367} width={175} />
            </div>
            </div> :
             channels
          }
          </div>
        </div>
    );
    }else{
      return (
        <Home/>
      );
    }
    
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user, 
    filteredChannels: state.channels.filteredChannels,
    loading:state.channels.loading, 
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearch: query => dispatch(actionCreators.filterChannels(query.toLowerCase())),
    fetchChannels: () => dispatch(actionCreators.fetchChannels()),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(ListChannels);
