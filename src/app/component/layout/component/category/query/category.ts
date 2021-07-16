import { gql } from 'apollo-angular';

export const CATEGORY = gql`
  query category($id: ID!, $filter: ListPost) {
    category(id: $id) {
      name
      posts(filter: $filter) {
        items {
          id
          title
          content
          createdAt
          updatedAt
          slug

          user {
            fullName
            avatarUrl
          }
        }

        total
      }
    }
  }
`;
