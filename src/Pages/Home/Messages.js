import React, { Component } from 'react';
import Message from './Message';

export default class Messages extends Component {
  render() {
    return (
      <div className="message-page">
        <div className="messages-list">
          {[
            0,
            1,
            2,
            4,
            5,
            6,
            7,
            0,
            1,
            2,
            4,
            5,
            6,
            7,
            0,
            1,
            2,
            4,
            5,
            6,
            7,
            0,
            1,
            2,
            4,
            5,
            6,
            7,
            0,
            1,
            2,
            4,
            5,
            6,
            7,
          ].map((item, index) => <Message item={item} key={`index${index}`} />)}
        </div>

        <form>
          <input className="msg-input-container" placeholder="Enter Message" />
        </form>
      </div>
    );
  }
}
