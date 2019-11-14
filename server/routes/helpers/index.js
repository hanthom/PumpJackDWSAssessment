const { pool } = require('./config');

const createProduct = (req, response) => {
  const { name, description, price } = req.body;
  pool.query('INSERT INTO "Products" (name, description, price) VALUES ($1, $2, $3)', [name, description, price], (err) => {
    if (err) {
      throw err
    }
    return response.status(201).json({ status: 'success', message: 'Product added.'});
  });
}

const getProducts = (req, response) => {
  pool.query('SELECT * FROM "Products"', (err, res) => {
    if (err) {
      throw err
    }
    return response.status(200).json(res.rows);
  });
}

const getProduct = (req, response) => {
  pool.query('SELECT * FROM "Products" where id = $1', [req.params.id], (err, res) => {
    if (err) {
      throw err
    }
    return response.status(200).json(res.rows);
  });
}

const updateProduct = (req, response) => {
  let query = 'UPDATE "Products" SET ';
  let tempArray = [];
  const length = Object.keys(req.body).length;
  const additional = (num) => {
    if (num < length) {
      return ", ";
    } else {
      return "";
    }
  }

  Object.keys(req.body).forEach((key, index) => {
    query = query + `${key} = $${index + 1}` + additional(index + 1);
    tempArray.push(req.body[key]);
  });
  query = query + ` WHERE id = $${(length + 1)}`;
  tempArray.push(req.params.id);

  pool.query(query, tempArray, (err, res) => {
    if (err) {
      throw err
    }
    return response.status(201).json(res.rows);
  })
}

const deleteProduct = (req, response) => {
  const { id } = req.params;
  pool.query('DELETE from "Products" where id = $1', [id], (err) => {
    if (err) {
      throw err
    }
    return response.status(204);
  });
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
