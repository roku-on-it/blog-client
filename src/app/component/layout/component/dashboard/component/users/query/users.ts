import { gql } from 'apollo-angular';

export const USERS = gql`
  query getUsers($filter: ListUser) {
    users(filter: $filter) {
      items {
        id
        role
        username
        fullName
        avatarUrl
        posts {
          total
        }
      }
      total
    }
  }
`;
