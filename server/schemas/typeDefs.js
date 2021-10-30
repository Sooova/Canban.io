const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    githubUser: String
  }

  type Card {
    id: ID
    title: String
    state: String
    workspaceID: ID
    updatedAt: String
  }

  type Workspace {
    id: ID
    title: String
    adminUser: ID
    repositoryName: String
    updatedAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User,
    hello: String,
    getAllCards: [Card]
    getWorkspaceCards(workspaceID: ID): [Card]
    getWorkspaces: [Workspace]
  }

  input CardInput {
    title: String
    state: String
    workspaceID: ID
  }

  type Mutation {
    deleteWorkspace(id: ID!, workspaceID: ID!): String
    addWorkspace(title: String!, repositoryName: String): Workspace
    addUser(email: String!, password: String!): Auth
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
    createCard(title: String!, state: String!, workspaceID: ID!): Card
    deleteCard(id: ID): String
    updateCard(id:ID, state: String, id: ID!): Card
    updateWorkspace(id:ID, title: String, repositoryName: String): Workspace
  }
`;

module.exports = typeDefs;
