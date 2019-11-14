const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { pool } = require('./helpers/config');

const helpers = require('./helpers/index');

// GET for all products
router.get('/', auth, helpers.getProducts);
// GET one project by id
router.get('/:id', auth, helpers.getProduct);
// POST product
router.post('/', auth, helpers.createProduct);
// PUT for updating product
router.put('/:id', auth, helpers.updateProduct);
// DELETE request for removing product
router.delete('/:id', auth, helpers.deleteProduct);

// GET Products tied to user
router.get('/user/:id', auth, (req, response) => {
  pool.query('SELECT * FROM "Products" WHERE "userId" = $1', [req.params.id], (err, res) => {
    if (err) {
      throw err
    }
    if (res.rows.length === 0) {
      response.status(404).send({ message: 'User has no associated products'});
    } else {
      response.status(200).json(res.rows);
    }
  })
});

module.exports = router;
