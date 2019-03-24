import React, { Component } from 'react';
import logo from './assets/fat.png';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser , faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import * as actionCreators from "./store/actions";
import { Link } from "react-router-dom";

    /* -- get User accoutn -- */
class UserAccount extends Component {
      /* -- if user logid in  -- */
  getUserProf(){
    return (
      <div>
      <br/>
      <span className="text-light" style={{fontSize:"3rem"}}><FontAwesomeIcon  icon={faUser} /></span>
      <div className="col-12 border font-weight-bold text-center bg-dark border-info rounded-pill ">
          <h4 className="text-warning text-center mt-2">{this.props.user.username}</h4>
      </div>
      <Link to="/CreateChannel" className="col-12 border mt-2 text-center bg-dark border-info rounded-pill btn btn-dark">
          <span className="text-warning text-center" style={{fontSize:"15px"}}> <FontAwesomeIcon  icon={faPlusCircle} /> Channel</span>
      </Link>
      <br/><br/><br/><br/><br/>
      <button onClick={()=>this.props.logout()} className="col-12 border text-danger font-weight-bold border-danger rounded-pill  btn btn-dark" >Logout</button>
      </div>
    )
  }
      /* -- if user logout -- */
  getLoginSingup(){
    return(
      <div>
        <br/>
        <br/><br/><br/>
          <Link to="/Login" className="mb-3 col-12 border text-light font-weight-bold border-primary rounded-pill  btn btn-dark" >Login</Link><br/>
          <Link to="/SingUp" className="mb-3 col-12 border text-light font-weight-bold border-primary rounded-pill  btn btn-dark" >Singup</Link><br/>
      </div>
    )
  }
  render() {
    return (
        <div className="animated slideInLeft col-2 offset-2 my-3 shadow mr-1 rounded text-center"  style={{height: "35rem", backgroundColor: "rgba(68,80,88,0.7)"}}>
        	<Link to="/ListChannels">
            <div className="mt-2 col-12">
		  		  <img  style={this.props.user ? {width:"9rem"} :{width:"5rem"}} src={logo} className="rounded" alt="..."/>
            </div>
          </Link>
			<hr className="border border-warning"/>
			<div className="mt-2 col-12">
				{
          this.props.user ?  this.getUserProf() : this.getLoginSingup()
        }
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
    logout: () => dispatch(actionCreators.logout())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(UserAccount);
