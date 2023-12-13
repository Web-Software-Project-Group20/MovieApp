const pgPool = require('../config/connection.js');

const sql = {
  postComment: 'INSERT INTO group_comments (user_comments, id_users, id_groups) VALUES ($1, $2, $3) RETURNING *',
  getComments: 'SELECT id_comments, users.id_users, uname AS username, user_comments AS comment FROM group_comments INNER JOIN users ON group_comments.id_users = users.id_users WHERE id_groups = $1 ORDER BY created_at ASC;',
  deleteComment: 'DELETE FROM group_comments WHERE id_comments = $1 AND id_users = $2 RETURNING *'
};

const getComments = async (idComments) => {
  try {
    const result = await pgPool.query(sql.getComments, [idComments]);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      throw new Error('Comments not found');
    }
  } catch (error) {
    console.log('Error in getComments', error);
  }
};

const postComments = async (userComments, idUsers, idGroups) => {
  try {
    const result = await pgPool.query(sql.postComment, [userComments, idUsers, idGroups]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Error posting comment');
    }
  } catch (error) {
    console.log('Error in postComments', error);
  }
};

const deleteComment = async (commentId, userId) => {
  const values = [commentId, userId];
  try {
    const result = await pgPool.query(sql.deleteComment, values);
    return result.rowCount > 0;
  } catch (error) {
    console.log('Error in deleteComment', error);
    throw error;
  }
};

module.exports = { getComments, postComments, deleteComment };
