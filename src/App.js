import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Login from './Pages/Login';
import Home from './Pages/Home';

const client = new ApolloClient({
  uri: `http://localhost:5000/graphql`,
  
  onError: err => {
    console.log(err);
  },
});

// client
//   .query({
//     query: gql`
//       {
//         getAllUsers {
//           name
//           id
//         }
//       }
//     `,
//   })
//   .then(({ data }) => console.log({ data }));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/home" component={Home} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
