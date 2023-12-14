import { useEffect, useState } from "react";
import MediaList from "../global/MediaList";
import { useParams } from "react-router-dom";
import { GetContent } from "../discoverComponents/contentApi";
import styled from "styled-components";

const ContentSearch = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const { query: rawQuery } = useParams();
  const query = rawQuery.replace('query=', '');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const params = { query: query, api_key: apiKey };
        
        let moviesWithPosters = [];
        let tvShowsWithPosters = [];
        let page = 1;

        while (moviesWithPosters.length + tvShowsWithPosters.length < 15 && page <= 5) {
          const movies = await GetContent("search/movie", { ...params, page });
          const tvShows = await GetContent("search/tv", { ...params, page });

          moviesWithPosters = [...moviesWithPosters, ...movies.filter(item => item.poster_path)];
          tvShowsWithPosters = [...tvShowsWithPosters, ...tvShows.filter(item => item.poster_path)];

          page++;
        }

        setAllMovies(moviesWithPosters.slice(0, 15));
        setAllShows(tvShowsWithPosters.slice(0, 15));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <SearchContent>
      <MediaList media={allMovies} mediaType="movies" displayCount={15} />
      <MediaList media={allShows} mediaType="shows" displayCount={15} />
    </SearchContent>
  );
};

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
  margin-right: 40px;
`;

export default ContentSearch;