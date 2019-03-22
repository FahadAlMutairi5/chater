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

class App extends Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }
  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
  componentDidMount() {
    this.props.checkForExpiredToken();
  }
  // setInterval(
  //       () => this.props.newMessages &&this.addNotification()
  //       ,
  //       1000
  //     );
  render() {
    
    return (
      <div className="container my-5">
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="row">
          <UserAccount/>
          <Switch>
              <Route path="/ListChannels" component={ListChannels} />
              <Route path="/channel/:channelName/:channelId" component={ViewChannel}/>
              <Route path="/Login" component={Login}/>
              <Route path="/SingUp" component={SingUp}/>
              <Route path="/CreateChannel" component={CreateChannel}/>
              <Redirect to="/Login" />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
  newMessages: state.mess.newMessages, 
  };
};
const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
    fetchChannels: () => dispatch(actionCreators.fetchChannels()),
  };
};
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(App));
