import React, { Component } from 'react';
import Select from 'react-select';
import { Query, Mutation } from 'react-apollo';
import GET_USERS from './../../Query/GET_USERS';
import GET_CHANNELS from './../../Query/GET_CHANNEL_BY_ID';
import ADD_CHANNEL from './../../Query/CREATE_CHANNEL';
import Channel from './Channel';
import CREATE_CHANNEL from './../../Query/CREATE_CHANNEL';

export default class Channels extends Component {
  state = {
    selectedOption: '',
    channelName: '',
  };

  onSubmit = async (e, createChannel) => {
    e.preventDefault();
    const { selectedOption, channelName } = this.state;
    await createChannel({
      variables: {
        name: channelName,
        members: selectedOption.map(item => item.value),
        userId: '2cd96e06-ce51-4be3-886c-808dc2c42b31',
      },
      update: (store, { data: { createChannel } }) => {
        const data = store.readQuery({
          query: GET_CHANNELS,
          variables: {
            userId: '2cd96e06-ce51-4be3-886c-808dc2c42b31',
          },
        });
        console.log(data);
        data.getAllChannels.push(createChannel);
        store.writeQuery({
          query: GET_CHANNELS,
          data,
          variables: {
            userId: '2cd96e06-ce51-4be3-886c-808dc2c42b31',
          },
        });
      },
    });
  };

  handleValueChange = e => {
    const value = e.target.value;
    this.setState({
      channelName: value,
    });
  };

  handleChange = selectedOption => {
    console.log(selectedOption, 'Selected opption');
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption, channelName } = this.state;
    return (
      <div className="channel-page">
        <Mutation mutation={CREATE_CHANNEL}>
          {(createChannel, { error, data, loading }) => {
            if (loading) return <div>Loading ....</div>;
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
              <div>
                <div>
                  <input
                    value={channelName}
                    onChange={this.handleValueChange}
                    placeholder="Enter Channel Name"
                  />
                </div>
                <Query query={GET_USERS}>
                  {({ data: { getAllUsers }, loading, error }) => (
                    <Select
                      isMulti={true}
                      name="form-field-name"
                      value={selectedOption}
                      isLoading={loading}
                      onChange={this.handleChange}
                      options={
                        getAllUsers
                          ? getAllUsers.map(item => ({
                              value: item.id,
                              label: item.name,
                            }))
                          : []
                      }
                    />
                  )}
                </Query>
                <div>
                  <button onClick={e => this.onSubmit(e, createChannel)}>
                    Create Channel
                  </button>
                </div>
              </div>
            );
          }}
        </Mutation>
        <div>
          <Query
            variables={{ userId: '2cd96e06-ce51-4be3-886c-808dc2c42b31' }}
            query={GET_CHANNELS}
          >
            {({ data: { getAllChannels }, loading }) => {
              if (loading)
                return (
                  <div>
                    Loading...<span role="img">🏊‍♂️🏊‍♂️</span>
                  </div>
                );
              return getAllChannels.map(item => (
                <Channel item={item} key={`index${item.id}`} />
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}
