import React, { Component } from 'react';
import logo from './assets/fat.png';

class GoodBye extends Component {
  
  render() {
    return (
      <div className="animated slideInRight col-6 my-3 shadow rounded text-center" style={{backgroundColor:"rgba(170,175,179,0.4)"}}>
          <div className="col-12 text-center" style={{height: "28rem"}}>
            <div className="animated rotateIn mt-5 col-12">
              <img style={{width:"16rem"}} src={logo} className="rounded" alt="..."/>
            </div>
            <h1>Good Bye</h1>
          </div>

        </div>
    );
  }
}

export default GoodBye;


