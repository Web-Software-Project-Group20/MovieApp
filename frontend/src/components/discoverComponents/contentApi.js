import axios from "axios";

const baseUrl = 'https://api.themoviedb.org/3/';

const GetContent = async (mediaType, params) => {
  try {
    const response = await axios.get(`${baseUrl}${mediaType}`, { params });
    return response.data.results;
  } catch (error) {
    throw new Error(`Error in GetContent: ${error.message}`);
  }
};
const genreNameToId = (genreName) => {
  const genres = {
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Mystery: 9648,
    Western: 37,
  };

  return genres[genreName] || null;
};

export { GetContent, genreNameToId };