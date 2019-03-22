import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";

class SingUp extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    return this.props.signup(this.state, this.props.history);
  };
  render() {
    return (
        <div className="animated slideInRight col-6 my-3 shadow rounded text-center" style={{height: "35rem",backgroundColor:"rgba(200,223,241,0.2)"}}>
          <br/><br/><br/><br/>
          <div className="mt-5">
                    <h1>Singup</h1>
            <form onSubmit={this.submitHandler}>
              <div className="form-group text-left">
                <h5 className="ml-2" for="exampleInputEmail1">User Name</h5>
                <input 
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.changeHandler} 
                className="form-control rounded-pill"/>
              </div>
              <div className="form-group text-left">
                <h5 className="ml-2" for="exampleInputPassword1">Password</h5>
                <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
                className="form-control rounded-pill"/>
              </div>
              <button type="submit" className="btn btn-primary rounded-pill">Singup</button>
            </form>
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.auth.user };
};
const mapDispatchToProps = dispatch => {
  return {
  signup: (userData, history) =>
    dispatch(actionCreators.signup(userData, history)),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(SingUp);
