import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MediaListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MediaItem = styled.div`
  width: 18%;
  margin-bottom: 5px;
  box-sizing: border-box;
  position: relative;
`;

const MediaTitle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
  margin: 0;
  text-align: center;
  max-width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
`;

const MediaList = ({ media, mediaType, displayCount }) => {
  const displayedMedia = media.slice(0, displayCount);

  return (
    <MediaListContainer>
      {displayedMedia.map((item) => (
        item.poster_path && (
        <MediaItem key={item.id}>
          <Link to={`/${mediaType}/${item.id}`}>
            <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
            <MediaTitle>{item.title || item.name}</MediaTitle>
          </Link>
        </MediaItem>
      )))}
    </MediaListContainer>
  );
};
MediaList.propTypes = {
  media: PropTypes.array.isRequired,
  mediaType: PropTypes.string.isRequired,
};

export default MediaList;