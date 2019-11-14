const products = require('../routes/helpers/index');

test('Create Product - should return status 201 with success message of Product added', () => {
  const result = products.createProduct({body:{
    name: 'Swifter',
    description: 'Better than a vacuum',
    price: 34.99,
  }});
  expect(result).toBe({ status: 'success', message: 'Product added.'})
});
