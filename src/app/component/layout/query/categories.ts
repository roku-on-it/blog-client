import { gql } from 'apollo-angular';

export const CATEGORIES = gql`
  query categories($filter: ListCategory) {
    categories(filter: $filter) {
      id
      name
      slug
    }
  }
`;
