const user = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('../auth/auth.js');

const createUser = async (req, res, next) => {
  const userData = req.body;
  try {
    const { uname, pw, email } = userData;
    if (!uname || !pw || !email || uname === '' || pw === '' || email === '') {
      res.status(400);
      throw new Error('Invalid user data');
    }
    const isEmailInUse = await user.isEmailInUse(email);
    if (isEmailInUse) {
      res.status(400);
      throw new Error('Email already in use');
    }
    const dbResult = await user.createUser(userData);
    const { id_users: userId } = dbResult.rows[0].id_users;
    jwt.createToken(res, userId);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const uname = req.body.uname;
  const pw = req.body.pw;
  try {
    const dbResult = await user.getPasswordAndId(uname);
    if (!dbResult) {
      res.status(404);
      throw new Error('User not found');
    }
    const { pw: pwHash, id_users: userId } = dbResult[0];
    const isAuthenticated = await bcrypt.compare(pw, pwHash);
    if (!isAuthenticated) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    jwt.createToken(res, userId);
    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res) => {
  res.cookie('uJwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const updateUser = async (req, res, next) => {
  const userData = req.body;
  const userId = res.locals.userId;
  try {
    if (userData.fname === '' || userData.lname === '' || !userData.fname || !userData.lname) {
      res.status(400);
      throw new Error('Invalid user data');
    }
    const dbResult = await user.updateUser(userData, userId);
    if (!dbResult) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ message: 'User edited successfully', dbResult });
  } catch (error) {
    next(error);
  }
};

// Have to be modified to use the new authorization method
// JWT returns the user id, not the username, so we have to modify the getUserInfo method to
// accept the user id instead of the username
const getUserInfo = async (req, res) => {
  const uname = res.locals.username;

  try {
    const userInfo = await user.getUserInfo(uname); // has to be modified to accept the user id
    res.status(200).json({ message: 'Success', userInfo });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  signIn,
  signOut,
  updateUser,
  getUserInfo
};
