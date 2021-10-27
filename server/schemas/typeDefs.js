const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
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
    adminUser: Int
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
    addUser(email: String!, password: String!): Auth
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
    createCard(Card: CardInput): Card
    deleteCard(id: ID): String
    updateCard(id:ID, Card: CardInput): Card
  }
`;

module.exports = typeDefs;
