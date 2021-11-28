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
    $firstName: String!
    $lastName: String!
    $githubUser: String
  ) {
    addUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      githubUser: $githubUser
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
    $workspaceID: ID!
    $color: String!
    $autoImport: Boolean
  ) {
    createCard(
      title: $title
      state: $state
      workspaceID: $workspaceID
      color: $color
      autoImport: $autoImport
    ) {
      title
      state
      workspaceID
      color
      autoImport
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

export const UPDATE_WORKSPACE = gql `
  mutation updateWorkspace(
    $id: ID!
    $title: String
    $repositoryName: String
  ){
    updateWorkspace(
      id: $id
      title: $title
      repositoryName: $repositoryName
    ) {
      title
      repositoryName
    }
  }
`;

export const CREATE_WORKSPACE = gql `
  mutation addWorkspace(
    $title: String!
    $repositoryName: String
    $workspaceColor: String!
  ) {
    addWorkspace(
      title: $title
      repositoryName: $repositoryName
      workspaceColor: $workspaceColor
    ) {
      title
      repositoryName
      workspaceColor
    }
  }
`; 

export const DELETE_WORKSPACE = gql `
  mutation deleteWorkspace(
    $id: ID!
  ) {
    deleteWorkspace(
      id: $id
    )
  }
`;