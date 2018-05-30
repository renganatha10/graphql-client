import { gql } from 'apollo-boost';

export default gql`
  mutation createChannel($name: String!, $members: [ID!], $userId: ID!) {
    createChannel(input: { name: $name, members: $members, userId: $userId }) {
      id
      name
      members {
        name
      }
    }
  }
`;
