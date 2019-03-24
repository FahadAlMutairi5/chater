import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";
import GoodBye from './GoodBye';
import logo from './assets/fat.png';

    /* -- get Create Channel Component -- */
class CreateChannel extends Component {
  state = {
    name: "",
    image_url: "",
    owner: ""
  };
      /* -- after Create Channel -- */
  submitChannel = event => {
    event.preventDefault();
    this.props.createChannel(this.state, this.props.history);
  };
  componentWillUnmount() {
   if (this.props.errors.length) this.props.setErrors();
 }
     /* -- set channel info -- */
  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });
  render() {
    const errors = this.props.errors;
    if (this.props.user){
      return (
        <div className="animated slideInRight col-6 my-3 shadow rounded text-center" style={{height: "35rem",backgroundColor:"rgba(200,223,241,0.2)"}}>
          <br/>
          <div className="mt-2">
          {!!errors.length ? (
             
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {errors.map(error => (
                 <p key={error}>{error}</p>
               ))}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            ):
            <img style={{width:"12rem"}} src={logo} className="animated rotateIn rounded" alt="..."/>
          }
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
        <GoodBye/>
      );
      }
    
  }
}
const mapStateToProps = state => {
  return { 
    user: state.auth.user,
    errors: state.errors.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createChannel: (newChannel, history) =>
      dispatch(actionCreators.createChannel(newChannel, history)),
      setErrors: () => dispatch(actionCreators.setErrors())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateChannel);
