const express = require('express');
const router = express.Router();
const { pool } = require('./helpers/config');
require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { email } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  pool.query('SELECT * FROM "Users" where email = $1', [email], (err, response) => {
    if (err) {
      throw err
    } else if (response.rows.length === 0) {
      return res.status(400).send('Invalid email');
    } else {
      const { email, firstName, lastName, id } = response.rows[0]
      const token = jwt.sign({ _id: id, email: email, name: `${firstName} ${lastName}` }, process.env.JWT_KEY);
      res.header('x-auth-token', token).status(200).json(token);
    }
  })
})

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
  }

  return Joi.validate(req, schema);
}

module.exports = router;
