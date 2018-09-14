import { gql } from 'apollo-boost';

export default gql`
  query getAllChannels($userId: ID!) {
    getAllChannels(userId: $userId) {
      name
      id
      members {
        name
      }
    }
  }
`;
