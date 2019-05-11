# Coding Challenge

To fetch dependencies for the server run this on the root folder
```
npm install
```

To fetch dependencies for the client run this on the /client folder
```
npm install
```
To run the server 
```
npm run server
```

To run the client
```
npm run client
```

To run the server and the client together
```
npm run start
```

{force:true} in server.js should be removed if the database has been populated already

# server.js
```
db.sequelize.sync({force:true}).then(() => {
```

This lines can be commented out if the database is already populated with dummy data

# server.js
```
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
```
