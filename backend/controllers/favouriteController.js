const favourites = require('../models/favouriteModel.js');

const getAllFavourites = async (req, res, next) => {
  try {
    const result = await favourites.getAllFavourites();
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

const addToFavourites = async (req, res, next) => {
  const idUsers = res.locals.userId;
  const { idGroups, movieId, seriesId, name, avatar } = req.body;
  try {
    const typeResult = await favourites.movieOrSeries(movieId, seriesId);
    if (typeResult) {
      const checkResult = await favourites.checkIfFavouriteExists(idUsers, idGroups, movieId, seriesId);
      if (checkResult.rowCount > 0) {
        const error = new Error('Allready in favourites');
        error.statusCode = 409;
        throw error;
      }
    }
    await favourites.addToFavourites(idUsers, idGroups, movieId, seriesId, name, avatar);
    res.status(201).json({ message: 'Added to favourites successfully' });
  } catch (error) {
    next(error);
  }
};

const getFavouritesFrom = async (req, res, next) => {
  const idUsers = res.locals.userId;
  let idGroups = req.query.id_groups;
  try {
    if (idGroups === undefined) {
      idGroups = '';
    }
    const results = await favourites.getFavourites(idUsers, idGroups);
    if (results.rowCount === 0) {
      const error = new Error('No favorites found. Check if the user has favorites or if the ID is correct.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(results.rows);
  } catch (error) {
    next(error);
  }
};

const deleteFavourite = async (req, res, next) => {
  const idUsers = res.locals.userId;
  let idGroups = req.query.id_groups;
  const name = req.query.name;
  let results;
  try {
    if (name === undefined || name === '') {
      const error = new Error('Name not specified');
      error.statusCode = 404;
      throw error;
    } else if (idGroups === undefined) {
      idGroups = '';
    }
    results = await favourites.deleteFavourite(idUsers, idGroups, name);
    if (results.rowCount === 0) {
        const error = new Error('Nothing to delete');
        error.statusCode = 404;
        throw error;
    } else {
      res.status(200).json({ message: 'Delete success' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFavourites,
  getFavouritesFrom,
  addToFavourites,
  deleteFavourite
};
