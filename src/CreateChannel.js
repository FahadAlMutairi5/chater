import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import Home from './Home';

class Login extends Component {
  state = {
    name: "",
    image_url: "",
    owner: ""
  };
  submitChannel = event => {
    event.preventDefault();
    this.props.createChannel(this.state, this.props.history);
  };

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });
  render() {
    if (this.props.user){
      return (
        <div className="animated slideInRight col-6 my-3 shadow rounded text-center" style={{height: "35rem",backgroundColor:"rgba(200,223,241,0.2)"}}>
          <br/><br/><br/><br/>
          <div className="mt-2">
                  <h1>Create Channel</h1>
            <form className="mt-5" onSubmit={this.submitChannel}>
              <div className="form-group text-left">
                <input
                type="text"
                placeholder="Channel's name . . ."
                className="form-control rounded-pill"
                id="formGroupExampleInput"
                name="name"
                onChange={this.onTextchange}
              />
              </div>
              <div className="form-group text-left">
                <input
                type="text"
                placeholder="Channel's owner. . ."
                className="form-control rounded-pill"
                id="formGroupExampleInput"
                name="owner"
                onChange={this.onTextchange}
              />
              </div>
              <div className="form-group text-left">
                <input
                type="text"
                placeholder="Channel's Avatar . . ."
                className="form-control rounded-pill"
                id="formGroupExampleInput"
                name="image_url"
                onChange={this.onTextchange}
              />
              </div>
              <button type="submit" className="btn btn-primary rounded-pill">Create</button>
            </form>
          </div>
        </div>
    );}else{
      return (
        <Home/>
      );
      }
    
  }
}
const mapStateToProps = state => {
  return { user: state.auth.user };
};
const mapDispatchToProps = dispatch => {
  return {
    createChannel: (newChannel, history) =>
      dispatch(actionCreators.createChannel(newChannel, history))
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);
