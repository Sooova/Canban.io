import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
  ) {
    addUser(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_CARD = gql `
  mutation createCard(
    $title: String!
    $state: String!
    $workspaceID: Int!
  ) {
    createCard(
      title: $title
      state: $state
      workspaceID: $workspaceID
    ) {
      title
      state
      workspaceID
    }
  }
`;


export const DELETE_CARD = gql `
  mutation deleteCard(
    $id: ID!
  ) {
    deleteCard(
      id: $id
    )
  }
`;


export const UPDATE_CARD = gql `
  mutation updateCard(
    $id: ID!
    $state: String!
  ) {
    updateCard(
      id: $id
      state: $state
    ) {
      title
      state
      workspaceID
    }
  }
`; 

export const CREATE_WORKSPACE = gql `
  mutation addWorkspace(
    $title: String!
    $repositoryName: String
  ) {
    addWorkspace(
      title: $title
      repositoryName: $repositoryName
    ) {
      title
      repositoryName
    }
  }
`; 