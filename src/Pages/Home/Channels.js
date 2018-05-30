import React, { Component } from 'react';
import Select from 'react-select';
import { Query } from 'react-apollo';
import GET_USERS from './../../Query/GET_USERS';
import Channel from './Channel';

export default class Channels extends Component {
  state = {
    selectedOption: '',
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="channel-page">
        <div>
          <div>
            <input placeholder="Enter Channel Name" />
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
            <button>Create Channel</button>
          </div>
        </div>
        <div>
          {[0, 1, 2, 4, 5, 6, 7].map((item, index) => (
            <Channel item={item} key={`index${index}`} />
          ))}
        </div>
      </div>
    );
  }
}
