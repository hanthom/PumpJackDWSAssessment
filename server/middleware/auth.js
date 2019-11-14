const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  console.log('start auth', token);
  if (!token) return res.status(401).send('Access Denied. No token provided');

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_KEY);
    req.user = decodedPayload;
    console.log('USER MAKING REQUEST', req.user.email, req.user.name);
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token');
  }
}
