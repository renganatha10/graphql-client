import { gql } from 'apollo-boost';

export default gql`
  mutation createMessage($message: String!, $channelId: ID!, $channelId: ID!) {
    createMessage(
      input: { message: $message, channelId: $channelId, channelId: $channelId }
    ) {
      id
      message
      user {
        name
      }
    }
  }
`;
