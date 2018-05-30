import React, { Component } from 'react';

export default class Channel extends Component {
  render() {
    return <div className="channel-list">{this.props.item}</div>;
  }
}
