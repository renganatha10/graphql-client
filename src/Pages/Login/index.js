import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import CREATE_USER from './../../Query/CREATE_USER';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  onSubmit = async (e, createVideos) => {
    e.preventDefault();
    const { email, name } = this.state;
    await createVideos({
      variables: { name, email, gender: 'MALE' },
    });
    this.setState({
      email: '',
      name: '',
    });
    window.location.pathname = '/home';
  };

  onEmailChange = e => {
    const value = e.target.value;
    this.setState({
      email: value,
    });
  };

  onNameChange = e => {
    const value = e.target.value;
    this.setState({
      name: value,
    });
  };

  render() {
    return (
      <div>
        Login Into Message Me
        <Mutation mutation={CREATE_USER}>
          {(createVideos, { error, data, loading }) => {
            if (loading) return <div>Loading....</div>;
            if (error)
              return (
                <p>
                  Error{' '}
                  <span aria-label="Error" role="img">
                    😟😯
                  </span>
                </p>
              );
            return (
              <form onSubmit={e => this.onSubmit(e, createVideos)}>
                <input
                  onChange={this.onNameChange}
                  value={this.state.name}
                  placeholder="User Name"
                />
                <input
                  value={this.state.email}
                  onChange={this.onEmailChange}
                  placeholder="Enter Email"
                />
                <button onSubmit={e => this.onSubmit(e, createVideos)}>
                  Login
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Login;
