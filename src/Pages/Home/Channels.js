import React, {Component} from 'react';
import Select from 'react-select';
import {Query, Mutation} from 'react-apollo';
import GET_USERS from './../../Query/GET_USERS';
import GET_CHANNELS from './../../Query/GET_CHANNEL_BY_ID';
import ADD_CHANNEL from './../../Query/CREATE_CHANNEL';
import Channel from './Channel';
import CREATE_CHANNEL from './../../Query/CREATE_CHANNEL';
import CHANNEL_CREATED from '../../Query/CHANNEL_CREATED';

export default class Channels extends Component {
  state = {
    selectedOption: '',
    channelName: ''
  };

  
  onSubmit = async (e, createChannel) => {
    e.preventDefault();
    const {selectedOption, channelName} = this.state;
    await createChannel({
      variables: {
        name: channelName,
        members: selectedOption.map(item => item.value),
        userId: '062fc557-12ab-4029-a6a1-13a7f7cc3dcb'
      },
      update: (store, {data: {createChannel}}) => {
        const data = store.readQuery({
          query: GET_CHANNELS,
          variables: {
            userId: '062fc557-12ab-4029-a6a1-13a7f7cc3dcb'
          }
        });
        console.log(data);
        data.getAllChannels.push(createChannel);
        store.writeQuery({
          query: GET_CHANNELS,
          data,
          variables: {
            userId: '062fc557-12ab-4029-a6a1-13a7f7cc3dcb'
          }
        });
      }
    });
  };

  handleValueChange = e => {
    const value = e.target.value;
    this.setState({
      channelName: value
    });
  };

  handleChange = selectedOption => {
    console.log(selectedOption, 'Selected opption');
    this.setState({selectedOption});
  };

  render() {
    const {selectedOption, channelName} = this.state;
    return (
      <div className="channel-page">
        <Mutation mutation={CREATE_CHANNEL}>
          {(createChannel, {error, data, loading}) => {
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
                  {({data: {getAllUsers}, loading, error}) => (
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
                              label: item.name
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
            variables={{
              userId:
                '062fc557-12ab-4029-a6a1-13a7f7cc3dcb'
            }}
            query={GET_CHANNELS}
          >
            {/* {result => <Channel {...result} />} */}
            
            {({ subscribeToMore, ...result }) => (
              <Channel
                {...result}
              subscribeToNewChannels = {() => 
                subscribeToMore({
                  document: CHANNEL_CREATED,
                  variables: { userId: '062fc557-12ab-4029-a6a1-13a7f7cc3dcb'},
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newChannel = subscriptionData.data.channelCreated;

                    return Object.assign({}, prev, {
                      getAllChannels: {
                        name: { newChannel, ...prev.getAllChannels.name },
                        id: { newChannel, ...prev.getAllChannels.id },
                        members: { newChannel, ...prev.getAllChannels.members }
                      }
                    })
                  }
                })
              }
            />
            )}
            
            
            {/* {({ data: { getAllChannels }, loading }) => {
              if (loading)
                return (
                  <div>
                    Loading...
                    <span role="img">🏊‍♂️🏊‍♂️</span>
                  </div>
                );
              return getAllChannels.map(item => (
                <Channel item={item} key={`index${item.id}`} />
              ));
            }} */}

          </Query>
        </div>
      </div>
    );
  }
}
