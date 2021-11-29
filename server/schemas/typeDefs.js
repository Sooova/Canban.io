const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    githubUser: String
    firstName: String
    lastName: String
    createdAt: String
    updatedAt: String
  }

  type Card {
    id: ID
    title: String
    state: String
    workspaceID: ID
    updatedAt: String
    color: String
    autoImport: Boolean
  }

  type Workspace {
    id: ID
    title: String
    adminUser: ID
    repositoryName: String
    updatedAt: String
    workspaceColor: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User,
    getAllCards: [Card]
    getWorkspaceCards(workspaceID: ID): [Card]
    getWorkspaces: [Workspace]
    getWorkspaceName(workspaceID: ID): Workspace
  }

  input CardInput {
    title: String
    state: String
    workspaceID: ID
  }

  type Mutation {
    deleteWorkspace(id: ID!, workspaceID: ID!): String
    addWorkspace(title: String!, repositoryName: String, workspaceColor: String!): Workspace
    addUser(firstName: String!, lastName: String!, email: String!, githubUser: String, password: String!): Auth
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
    createCard(title: String!, state: String!, workspaceID: ID!, color: String!, autoImport: Boolean): Card
    deleteCard(id: ID): String
    updateCard(id:ID, state: String, id: ID!): Card
    updateWorkspace(id:ID, title: String, repositoryName: String): Workspace
  }
`;

module.exports = typeDefs;
