module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, {
      foreignKey: 'id',
      as: 'products',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
