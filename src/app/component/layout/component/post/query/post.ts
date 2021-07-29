import { gql } from 'apollo-angular';

export const POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      updatedAt
      createdAt
      content
      sources
      category {
        id
        name
        slug
      }
      user {
        fullName
        avatarUrl
      }
    }
  }
`;
