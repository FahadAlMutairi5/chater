import React, { Component } from 'react';
import { connect } from "react-redux";


class Message extends Component {
  
  render() {
    const messageObj = this.props.message;
    //2019-03-16T06:32:21.997461Z
    let timestampObj = messageObj.timestamp;
    const date = timestampObj.slice(0, 10);
    const time = timestampObj.slice(11, 16);
    return (
      <div id={this.props.last} className={`${messageObj.username ===  this.props.user.username ? "col-12 alert alert-success rounded mt-1 float-right animated slideInRight" : "col-12 alert alert-light mt-1 rounded float-left text-left animated slideInLeft"}`} style={{width:"20rem", clear: "both"}}>
          <span className="text-muted rounded-pill float-left" style={{fontSize:"10px"}}>{time}</span><span className="ml-2">{messageObj.username}</span>
          <hr/>
          <p className="mb-0 text-break">{messageObj.message}</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { 
    channels: state.channels.channels,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(Message);


