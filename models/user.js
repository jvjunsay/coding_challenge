export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    });
  
    User.associate = (models) => {
      User.hasMany(models.property);
    };
  
    return User;
  };
  