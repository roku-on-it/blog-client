import { gql } from 'apollo-angular';

export const POSTS = gql`
  query posts($filter: ListPost) {
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
          slug
          id
        }
        user {
          fullName
          avatarUrl
        }
      }

      total
    }
  }
`;
