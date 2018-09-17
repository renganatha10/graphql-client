import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import Login from './Pages/Login';
import Home from './Pages/Home';

// const client = new ApolloClient({
//   uri: `http://localhost:5000/graphql`,
  
//   onError: err => {
//     console.log(err);
//   },
// });

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key || null
});

const client = new ApolloClient({
  link,
  cache
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
