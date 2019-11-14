module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Products',
    [
      {
        id: 100,
        name: "Bounty",
        description: "The Quicker Picker Upper",
        price: 5.99,
        userId: 1,
      },
      {
        id: 101,
        name: "Hanes",
        description: "Breathable",
        price: 10.99,
        userId: 2,
      },
      {
        id: 102,
        name: "Product 3",
        description: "Description 3",
        price: 99.99,
        userId: 3,
      },
      {
        id: 103,
        name: "Product 4",
        description: "Description 4",
        price: 54.99,
        userId: 1,
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {}),
};
