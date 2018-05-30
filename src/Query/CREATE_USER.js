import { gql } from 'apollo-boost';

export default gql`
  mutation createUser($name: String!, $email: String!, $gender: String!) {
    createUser(input: { name: $name, email: $email, gender: $gender }) {
      id
      name
      email
      gender
    }
  }
`;
