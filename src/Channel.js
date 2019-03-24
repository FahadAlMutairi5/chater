import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {slugify} from './utils/slugify'
    
     /* -- return channel -- */
class Channel extends Component {
  
  render() {
    const chatLogo = "https://pixel77.com/wp-content/uploads/2014/11/20-Creative-Chat-Logo-Designs-19.png";
    const channel = this.props.channel;
    return (
      <Link className="text-decoration-none" to={`/channel/${slugify(channel.name)}/${channel.id}`}> 
        <div id="Channel" className="animated slideInDown row border border-secondary justify-content-md-center rounded-pill p-2 m-2">
          <div className="col-2">
            <img style={{width:"2rem"}} src={channel.image_url ? channel.image_url : chatLogo} className="rounded-circle" alt="..."/>
          </div>
          <div className="col-10 text-center">
            <span className="text-break font-weight-bold">{channel.name}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default Channel;
