import Sequelize from 'sequelize';
import config from '../config';
const Op = Sequelize.Op;

const sequelize = new Sequelize(config.dbname, config.username, config.password, {
    host: config.hostname,
    dialect: config.dialect
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