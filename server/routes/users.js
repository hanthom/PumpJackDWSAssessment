const express = require('express');
const router = express.Router();
const { pool } = require('./helpers/config');


// GET all users.
router.get('/', (req, response) => {
  pool.query('SELECT * FROM "Users"', (err, res) => {
    if (err) {
      throw err
    }
    response.status(200).json(res.rows)
  });
});


module.exports = router;
