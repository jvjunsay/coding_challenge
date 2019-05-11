export default `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    properties: [Property!]!
  }

  type Property {
    id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    rent: Int!
    user: User!
  } 

  type Query {    
    properties: [Property!]!
    property(id: ID!): Property
    user(id: ID!): User
    users: [User!]!
    search(filter: String): [Property!]!
  }
`;