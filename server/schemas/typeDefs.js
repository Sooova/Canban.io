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
    workspaceID: Int
    updatedAt: String
  }

  type Workspace {
    id: ID
    title: String
    adminUser: ID
    repositoryName: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User,
    hello: String,
    getAllCards: [Card]
    getWorkspaceCards(workspaceID: Int): [Card]
    getWorkspaces: [Workspace]
  }

  input CardInput {
    title: String
    state: String
    workspaceID: Int
  }

  type Mutation {
    addWorkspace(title: String!, repositoryName: String): Workspace
    addUser(email: String!, password: String!): Auth
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
    createCard(title: String, state: String, workspaceID: Int): Card
    deleteCard(id: ID): String
    updateCard(id:ID, state: String, workspaceID: Int): Card
  }
`;

module.exports = typeDefs;
