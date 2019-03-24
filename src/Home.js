import React, { Component } from 'react';
import logo from './assets/fat.png';

    /* -- Show Home page frist get url -- */
class Home extends Component {
  render() {
    return (
      <div className="animated slideInRight col-6 my-3 shadow rounded text-center" style={{backgroundColor:"rgba(170,175,179,0.4)"}}>
          <br/><br/>
          <div className="col-12 text-center" style={{height: "23rem"}}>
            <div className="animated rotateIn delay-1s mt-5 col-12">
              <img style={{width:"20rem"}} src={logo} className="rounded" alt="..."/>
            </div>
          </div>

        </div>
    );
  }
}

export default Home;


