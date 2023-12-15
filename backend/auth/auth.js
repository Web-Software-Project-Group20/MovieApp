require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth (req, res, next) {
  const token = req.cookies.uJwt;
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;
    res.locals.userId = userId;
    next();
  } catch (error) {
    console.error('Error in authentication:', error.message);
    res.status(403);
    throw new Error('Not authorized');
  }
}

function createToken (res, userId) {
  if (userId === undefined) {
    console.error('Error in createToken: userId is undefined');
    throw new Error('Internal server error');
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
  res.cookie('uJwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 1000
  });
}

module.exports = { auth, createToken };
