import { gql } from 'apollo-boost';

export default gql`
subscription($userId: ID!) {
  channelCreated(userId: $userId) {
    id,
      name,
      members {
      name
    }
  }
}
`;