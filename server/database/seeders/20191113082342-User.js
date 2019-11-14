module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: 1,
        firstName: "Michael",
        lastName: "Hantho",
        email: 'm.hantho@gmail.com',
      },
      {
        id: 2,
        firstName: 'Dirk',
        lastName: 'Nowitzki',
        email: 'dunkindirk@gmail.com',
      },
      {
        id: 3,
        firstName: 'Kevin',
        lastName: 'Garnett',
        email: 'bigticket@gmail.com',
      },
      {
        id: 4,
        firstName: 'Mark',
        lastName: 'Cuban',
        email: 'owner@dallasmavericks.com',
      },
      {
        id: 5,
        firstName: 'Scooby',
        lastName: 'Doo',
        email: 'scoobysnacks@gmail.com',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
