import { gql } from 'apollo-boost';

export default gql`
  query getAllMessages($channelId: ID!) {
    getAllMessageByChannel(channelId: $channelId) {
      message
      id
      user {
        name
      }
      channel {
        id
        name
      }
    }
  }
`;
