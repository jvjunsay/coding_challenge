# Coding Challenge

To run the server and the client
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
