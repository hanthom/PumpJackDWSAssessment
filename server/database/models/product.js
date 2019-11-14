'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE',
    });
  };
  return Product;
};
