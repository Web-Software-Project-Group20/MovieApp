const pgPool = require('../config/connection.js');

const sql = {
  getReview: 'SELECT * FROM reviews WHERE id_review = $1',
  createReview: 'INSERT INTO reviews (username, score, review, time, movie_id, series_id) VALUES ($1, $2, $3, $4, $5, $6)',
  deleteReview: 'DELETE FROM reviews WHERE id_review = $1',
  sortBy: 'SELECT * FROM reviews ORDER BY $1 LIMIT 10'
};

const getReview = async (reviewId) => {
  try {
    const result = await pgPool.query(sql.getReview, [reviewId]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Review not found');
    }
  } catch (error) {
    console.error('Error in getReview', error);
    throw error;
  }
};

const createReview = async (reviewData) => {
  const { username, score, review, time, idMovie, idSeries } = reviewData;
  const values = [username, score, review, time, idMovie || null, idSeries || null];
  try {
    await pgPool.query(sql.createReview, values);
  } catch (error) {
    console.log('Error in createReview', error);
    return error;
  }
};

const deleteReview = async (reviewId) => {
  try {
    await pgPool.query(sql.deleteReview, [reviewId]);
  } catch (error) {
    console.log('Error in deleteReview', error);
    return error;
  }
};

const sortBy = async (columnName, value) => {
  let orderByClause;

  switch (columnName) {
    case 'Score':
      orderByClause = 'score';
      break;
    case 'ScoreLeast':
      orderByClause = 'score DESC';
      break;
    case 'TimeOld':
      orderByClause = 'time';
      break;
    case 'TimeNew':
      orderByClause = 'time DESC';
      break;
    default:
      throw new Error('Invalid column name');
  }

  const sqlQuery = sql.sortBy;
  const values = [value, orderByClause];

  try {
    const result = await pgPool.query(sqlQuery, values);
    return result.rows;
  } catch (error) {
    console.log('Error in sortBy', error);
    return error;
  }
};

module.exports = {
  getReview,
  createReview,
  deleteReview,
  sortBy
};
