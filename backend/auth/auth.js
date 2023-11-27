require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth (req, res, next) {
  const token = req.cookies.uJwt;
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;
    res.locals.userId = userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(403).json({ error: 'Unauthorized' });
  }
}

function createToken (res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
  res.cookie('uJwt', token, {
    httpOnly: true,
    secure: false, // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 60 * 60 * 1000
  });
}

module.exports = { auth, createToken };
