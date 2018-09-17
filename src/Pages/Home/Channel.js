import React, {Component} from 'react';

export default class Channel extends Component {
  componentDidMount() {
    this.props.subscribeToNewChannels();
  }
  render() {
    console.log('hi', this.props.data);
    return <div className="channel-list">Hi</div>;
  }
}
