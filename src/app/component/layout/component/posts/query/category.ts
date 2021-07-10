import { gql } from 'apollo-angular';

export const CATEGORY = gql`
  query category($id: ID!, $filter: ListPost) {
    category(id: $id) {
      posts(filter: $filter) {
        items {
          id
          title
          content
          createdAt
          updatedAt
          slug
          sources
          category {
            name
          }
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
