const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
  }

  type Cards {
    id: ID
    title: String
    creationDate: String
    state: String
    workspaceID: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User,
    hello: String,
    getAllCards: [Cards]
  }


  type Mutation {
    addUser(email: String!, password: String!): Auth
    updateUser(email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
