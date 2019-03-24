import React, { Component } from 'react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Messages from './Message';
import * as actionCreators from "./store/actions";
import { Link } from "react-router-dom";
import Loading from './Loading';
import GoodBye from './GoodBye';
import Sound from "react-sound";
import soundFileMP3 from "./assets/toThePoint.mp3";

class ViewChannel extends Component {
  timer = "";
  state = {
    channel:{},
    message:null,
    playedNotifcS: false,
  }
     /* -- Initial --*/
  async componentDidMount(){
      /* -- get all messages -- */
    await this.getMessages()
    if (this.props.messages.length !== 0){
      this.timer = setInterval(
      () =>
        this.getMessagesTimeStamp(
          this.props.match.params.channelId,
          this.props.messages[this.props.messages.length-1].timestamp
          ),1000
    );
    }
          /* -- get this channel -- */
    const channel = this.getChannel();
    this.setState({channel:channel})
    if(!this.props.loading){
      if (this.props.messages.length > 1){
                  /* -- Scroall on open channel -- */
      let lastId = this.props.messages[this.props.messages.length-1].id;
      let element = document.getElementById(String(lastId));
      element.scrollIntoView({behavior: "auto"});
      }
    }
  } 
              /* -- Update --*/
  componentDidUpdate(prevProps){
                      /* -- Set Inrerval of lass messages -- */
    if (prevProps.match.params.channelId !== this.props.match.params.channelId){
      if (this.props.messages.length !== 0){
      clearInterval(this.timer);
      this.timer = setInterval(
        () =>
        this.getMessagesTimeStamp(
          this.props.match.params.channelId,
          this.props.messages[this.props.messages.length-1].timestamp
          ),
        1000
      );

    }
    }
    if (this.props.messages.length > 1){
    if(prevProps.messages.length !== this.props.messages.length){
              /* -- go down to last messages  -- */
     this.goDown();
    }
    }
                  /* -- set notification to new messages  -- */
    if (prevProps.match.params.channelId === this.props.match.params.channelId 
      && prevProps.messages.length !== this.props.messages.length){
        let newMessages = this.props.newMessages
        this.props.resetNotification() //resat all last notifaction to add new one
        if (newMessages.length >= 1){
          newMessages.forEach(message =>{
              if (message.username !== this.props.user.username) {
                  this.setState({playedNotifcS:true})
                  this.props.addNotification(message.username, message.message);
              }

          })
        }
        
    }
  }
  /* -- sound function to new message -- */
  sound = () => {
    return (
      <Sound
        url={soundFileMP3}
        playStatus={Sound.status.PLAYING}
        autoLoad={true}
        autoPlay={true}
        onError={(errorCode, description) => {
          console.log("sound error: ", description);
        }}
        onFinishedPlaying={this.togglePlay}
      />
    );
  };
  togglePlay = () => this.setState({ playedNotifcS: false }); //resat sound off
    /* -- after go from channel -- */
  componentWillUnmount(){
    clearInterval(this.timer);
  }
    /* -- go to last elemant of new messages -- */
  goDown(){
    let lastId = this.props.messages[this.props.messages.length-1].id;
    let element = document.getElementById(String(lastId));
    element.scrollIntoView({behavior: "smooth"});
  }
    /* -- get last message by time stamp -- */
  getMessagesTimeStamp(channelId,timeStamp){
    this.props.getMessagesTimeStamp(channelId,timeStamp)
  }
    /* -- fitch all messages  -- */
  async getMessages(channelId) {
    await this.props.getMessages(this.props.match.params.channelId)
    this.setState({lenghtM:this.props.messages.length})
  }
    /* -- faind channel by id  -- */
  getChannel = () => {
    let channel={};
    if(this.props.channels.length !== 0){
     channel = this.props.channels.find(channel => channel.id === +this.props.match.params.channelId);
    }
    return channel ;
  }
    /* -- get all messages commponint -- */
  getMessage = () => {
    return (
    this.props.messages.map((message) => (
      <Messages key={message.id} message={message} last={message.id} />
    ))
    )
  }
      /* -- send new message -- */
  handleKeyPress = event => {
    if (event.key === 'Enter'){
      const message = {message:this.state.message}
      this.props.sendMessage(this.props.match.params.channelId,message)
      this.setState({message:""})
    }
  };
      /* -- add message to state -- */
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
            <div className="col-12" style={{height: "23rem",  overflowX: "hidden", overflowY: "scroll"}}> 
              {this.getMessage()}
            </div> 
            : 
            <div className="col-6 offset-3">  
              <div className="spinner mx-auto text-center" style={{height: "25rem",  overflowX: "hidden", overflowY: "scroll"}}>
                <br/><br/><br/><br/>
                <Loading/>
                </div>
            </div>
          }
          {this.state.playedNotifcS && this.sound()}
          <hr/>
          <div className="col-12">
              <input type="text" className="form-control mb-2" placeholder= {!this.props.loading  && `message  ${this.state.channel.name}`} value={this.state.message} onKeyPress={this.handleKeyPress} onChange={this.setMessage}/>
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
const mapDispatchToProps = dispatch => {
  return {
    getMessages: (channelId) => dispatch(actionCreators.fetchMessages(channelId)),
    sendMessage: (channelId,message) => dispatch(actionCreators.sendMessage(channelId,message)),
    getMessagesTimeStamp:(channelId,timeStamp) => dispatch(actionCreators.getMessagesTimeStamp(channelId,timeStamp)),
    resetNotification: () => dispatch(actionCreators.resetNotification()),
  };
};
const mapStateToProps = state => {
  return {
    user: state.auth.user,  
    channels: state.channels.channels,
    messages: state.mess.masseges, 
    loading:state.mess.loading,
    newMessages:state.mess.newMessages, 
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(ViewChannel);


