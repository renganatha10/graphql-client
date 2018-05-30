import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return <div className="message-list">{this.props.item}</div>;
  }
}
