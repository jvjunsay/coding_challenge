import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import {db, Op} from "./models";
import cors from 'cors';

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db, Op }
});

const app = express();

//allow cross-origin
app.use(cors());
server.applyMiddleware({ app });

db.sequelize.sync({force:true}).then(() => {
  // populate user table with dummy data
  db.user.bulkCreate(
    times(3, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  );

  // populate property table with dummy data
  db.property.bulkCreate(
    times(20, () => ({
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      rent: faker.random.number(),
      userId: random(1, 3)
    }))
  );
  
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () =>
    console.log(`GraphQL API Ready: ${PORT}`)
  );
});
