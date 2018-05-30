import React, { Component } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Channels />
        <Messages />
      </div>
    );
  }
}

export default Home;
