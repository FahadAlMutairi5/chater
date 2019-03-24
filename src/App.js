import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import ListChannels from './ListChannels';
import UserAccount from './UserAccount';
import ViewChannel from './ViewChannel';
import Login from './Login';
import SingUp from './SingUp';
import CreateChannel from './CreateChannel';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import GoodBye from "./GoodBye";
import Home from "./Home";

class App extends Component {

  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();

  }

  addNotification(name,msssg) {
    this.notificationDOMRef.current.addNotification({
      title: `${name}`,
      message: `${msssg}`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
  // async getLastMessage(channelId){
  //   let allMessages = await this.props.getMessages(channelId);
  //         /* -- Test get Last Messages -- */
  //   //if (allMessages.length >= 1){
  //     //let lastMessage = allMessages[allMessages.length-1];
  //   //console.log(lastMessage);
  //   //let allNewMessages = this.props.getMessagesTimeStamp(channelId,lastMessage);
  
  //   //}
  // }
  async componentDidMount() {

    this.props.checkForExpiredToken();
      /* -- Test Intervals -- */
    //await this.props.fetchChannelsNotification();
    
  }
  componentWillUnmount(){
    /*This will run after unmount commponnt*/
    let setIntervals = this.state.setIntervals;
    setIntervals.forEach(interval => clearInterval(interval))
  }
  /* -- Test Notification -- */
  // getNotif(){
  //   let newMessages = this.props.newMessages
  //       if (newMessages.length >= 1){
  //         this.props.resetNotification()
  //         newMessages.forEach(message => 
  //                 message.username !== this.props.user.username && this.props.addNotification(message.username, message.message)
  //           )
  //       }
  // }
  render() {
    if (this.props.channelsNotification.length >= 1){
      console.log(this.props.channelsNotification)
    }
    return (
      <div className="container my-5">
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="row">
          <UserAccount/>
          <Switch>
              <Route path="/ListChannels" component={ListChannels} />
              <Route path="/channel/:channelName/:channelId" render={(props) => <ViewChannel {...props} addNotification={(name,msssg)=>this.addNotification(name,msssg)}/>}/>
              <Route path="/Login" component={Login}/>
              <Route path="/SingUp" component={SingUp}/>
              <Route path="/CreateChannel" component={CreateChannel}/>
              <Route path="/GoodBye" component={GoodBye}/>
              <Route path="/Home" component={Home}/>
              <Redirect to="/Home" />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,  
    newMessages:state.mess.newMessages,
    channels: state.channels.channels,
    channelsNotification:state.fetchChannelsNotif.channelsNotification,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
    resetNotification: () => dispatch(actionCreators.resetNotification()),
    getMessagesTimeStamp:(channelId,timeStamp) => dispatch(actionCreators.getMessagesTimeStamp(channelId,timeStamp)),
    fetchChannelsNotification:() => dispatch(actionCreators.fetchChannelsNotification()),
  };
};
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(App));
