import React, { Component } from 'react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Messages from './Message';
import * as actionCreators from "./store/actions";
import {withRouter} from 'react-router-dom'
import {slugify} from './utils/slugify';
import unslug from 'unslug';
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';
import Home from './Home';

class ViewChannel extends Component {
  timer = "";
  state = {
    channel:{},
    message:null,
  }
  async componentDidMount(){
    
    await this.getMessages()
    const messages = this.props.messages
    if (this.props.messages.length !== 0){
      this.timer = setInterval(
      () =>
        this.getMessagesTimeStamp(
          this.props.match.params.channelId,
          this.props.messages[this.props.messages.length-1].timestamp
          ),3000
    );
    }
    const channel = this.getChannel();
    this.setState({channel:channel})
    if(!this.props.loading){
      if (this.props.messages.length > 1){
      let lastId = this.props.messages[this.props.messages.length-1].id;
      let element = document.getElementById(String(lastId));
      element.scrollIntoView({behavior: "auto"});
      }
    }
  } 
  componentDidUpdate(prevProps){
    if (prevProps.match.params.channelId !== this.props.match.params.channelId){
      if (this.props.messages.length !== 0){
      clearInterval(this.timer);
      this.timer = setInterval(
        () =>
        this.getMessagesTimeStamp(
          this.props.match.params.channelId,
          this.props.messages[this.props.messages.length-1].timestamp
          ),
        3000
      );
    }
    }
    if (this.props.messages.length > 1){
    if(prevProps.messages.length !== this.props.messages.length){
     this.goDown(); 
    }
    }
    
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  goDown(){
    let lastId = this.props.messages[this.props.messages.length-1].id;
    let element = document.getElementById(String(lastId));
    element.scrollIntoView({behavior: "smooth"});
  }
  getMessagesTimeStamp(channelId,timeStamp){
    this.props.getMessagesTimeStamp(channelId,timeStamp)
  }
  async getMessages(channelId) {
    await this.props.getMessages(this.props.match.params.channelId)
    this.setState({lenghtM:this.props.messages.length})
  }
  getChannel = () => {
    let channel={};
    if(this.props.channels.length !== 0){
     channel = this.props.channels.find(channel => channel.id === +this.props.match.params.channelId);
    }
    return channel ;
  }
  getMessage = () => {
    return (
    this.props.messages.map((message) => (
      <Messages key={message.id} message={message} last={message.id} />
    ))
    )
  }
  handleKeyPress = event => {
    if (event.key === 'Enter'){
      const message = {message:this.state.message}
      this.props.sendMessage(this.props.match.params.channelId,message)
      this.setState({message:""})
    }
  };
  setMessage = event => {
    this.setState({message:event.target.value}) 
  }
  render() {
    const chatLogo = "https://pixel77.com/wp-content/uploads/2014/11/20-Creative-Chat-Logo-Designs-19.png";
    if (this.props.user){
      return (
        <div className="animated slideInRight col-6 my-3 shadow rounded text-center" style={{backgroundColor:"rgba(170,175,179,0.4)"}}>
          <div className="row mt-3">
            <div className="col-2  border-right">
              <Link to="/ListChannels">
                <span style={{fontSize: '23px'}}><FontAwesomeIcon icon={faChevronLeft} /></span>
              </Link>
            </div>
            <div className="col-8 text-center font-weight-bolder text-break">
              {!this.props.loading && this.state.channel.name}
            </div>
            {!this.props.loading && 
            <div className="col-2">
              <img style={{width:"4rem"}} src={this.state.channel.image_url ? this.state.channel.image_url : chatLogo} className="rounded-circle" alt="..."/>
            </div>}
          </div>
          <hr className="border border-light"/>
          {!this.props.loading ?
            <div className="col-12" style={{height: "25rem",  overflowX: "hidden", overflowY: "scroll"}}> 
              {this.getMessage()}
            </div> 
            : 
            <div className="col-6 offset-3">  
              <div className="spinner mx-auto text-center" style={{height: "25rem",  overflowX: "hidden", overflowY: "scroll"}}>
                <br/><br/><br/><br/>
                <ReactLoading type={"cylon"} color={"black"} height={367} width={175} />
              </div>
            </div>
          }
          <hr/>
          <div className="col-12">
              <input type="text" className="form-control mb-2" placeholder= {!this.props.loading  && `message  ${this.state.channel.name}`} value={this.state.message} onKeyPress={this.handleKeyPress} onChange={this.setMessage}/>
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
const mapDispatchToProps = dispatch => {
  return {
    getMessages: (channelId) => dispatch(actionCreators.fetchMessages(channelId)),
    sendMessage: (channelId,message) => dispatch(actionCreators.sendMessage(channelId,message)),
    getMessagesTimeStamp:(channelId,timeStamp) => dispatch(actionCreators.getMessagesTimeStamp(channelId,timeStamp))
  };
};
const mapStateToProps = state => {
  return {
    user: state.auth.user,  
    channels: state.channels.channels,
    messages: state.mess.masseges, 
    loading:state.mess.loading, 
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(ViewChannel);


