import Sequelize from 'sequelize';
const Op = Sequelize.Op;

// const operatorsAliases = {
//     eq: Op.eq,
//     ne: Op.ne,
//     gte: Op.gte,
//     gt: Op.gt,
//     lte: Op.lte,
//     lt: Op.lt,
//     like: Op.like
// };

const sequelize = new Sequelize('zmalyoyk', 'zmalyoyk', 'p6DeMqbkUzbQbI0TJwAPbtmaGG-VxZRQ', {
    host: 'john.db.elephantsql.com',
    dialect: 'postgres'
});

const db = {    
    property: sequelize.import('./property'),
    user: sequelize.import('./user'),
};

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db,Op};