import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      email
    }
  }
`;


export const FETCH_CARDS = gql `
  query getWorkspaceCards($workspaceID: Int){
    getWorkspaceCards(workspaceID: $workspaceID) {
      id
      title
      state
      updatedAt
    }
  }
`;

// const GET_DOG_PHOTO = gql`
//   query Dog($breed: String!) {
//     dog(breed: $breed) {
//       id
//       displayImage
//     }
//   }
// `;


export const FETCH_ALL_CARDS = gql `
  query {
    getAllCards {
      id
      title
      state
      workspaceID
      updatedAt
    }
  }
`;
