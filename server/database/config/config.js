require('dotenv').config()

module.exports = {
  development: {
    url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    dialect: 'postgres',
  }
}
