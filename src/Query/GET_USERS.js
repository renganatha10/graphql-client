import { gql } from 'apollo-boost';

export default gql`
  query getUsers {
    getAllUsers {
      name
      id
    }
  }
`;
