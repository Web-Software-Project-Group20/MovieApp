const pgPool = require('../config/connection.js');
const bcrypt = require('bcrypt');

const sql = {
  createUser: 'INSERT INTO users (uname, pw, email) VALUES ($1, $2, $3) RETURNING id_users',
  checkEmail: 'SELECT * FROM users WHERE email = $1',
  getPassword: 'SELECT pw, id_users FROM users WHERE uname = $1',
  getUserInfo: 'SELECT lname, fname, uname, email FROM users WHERE uname = $1',
  updateUser: 'UPDATE users SET fname = $1, lname = $2 WHERE id_users = $3 RETURNING uname, fname, lname'
};

const isEmailInUse = async (email) => {
  const result = await pgPool.query(sql.checkEmail, [email]);
  return result.rows.length > 0;
};

const createUser = async (userData) => {
  const { uname, pw, email } = userData;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(pw, saltRounds);
  const values = [uname, passwordHash, email];
  try {
    const result = await pgPool.query(sql.createUser, values);
    return result;
  } catch (error) {
    console.log('Error in createUser', error);
    throw new Error('Error in createUser');
  }
};

const getPasswordAndId = async (uname) => {
  const result = await pgPool.query(sql.getPassword, [uname]);
  if (result.rows.length > 0) {
    return result.rows;
  } else {
    return null;
  }
};

const updateUser = async (userData, userId) => {
  const { fname, lname } = userData;
  const values = [fname, lname, userId];
  console.log(values);
  try {
    const result = await pgPool.query(sql.updateUser, values);
    console.log(result.rows);
    if (result.rows.length < 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.log('Error in updateUser', error);
    throw new Error('Error in updateUser');
  }
};

// This method has to be modified to use the new authorization method
// JWT returns the user id, not the username, so we have to modify the getUserInfo method to
// accept the user id instead of the username
// Also error handling has to be modified to be consistent with the rest of the app
const getUserInfo = async (uname) => {
  try {
    const result = await pgPool.query(sql.getUserInfo, [uname]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in getUserInfo', error);
    throw error;
  }
};

module.exports = {
  createUser,
  isEmailInUse,
  getPasswordAndId,
  getUserInfo,
  updateUser
};
