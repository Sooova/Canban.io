import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      email
    }
  }
`;


export const FETCH_CARDS = gql `
  query {
    getWorkspaceCards(workspaceID: $workspaceID) {
      title
      state
      updatedAt
    }
  }
`;

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


{data.map((cardData) => {
  return (
      <StyledCardDate>
          {cardData.updatedAt}
      </StyledCardDate>
  )
})}