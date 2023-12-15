// groupsComponents/ListSection.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ListSectionContainer = styled.div`
  flex: 1;
`;

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

const ListSection = ({ favoritesData }) => {

  console.log(Array.isArray(favoritesData));
  const favorites = favoritesData.slice(0,5);

  if (!favorites) {
    return <p>No favourites yet.</p>;
  }

  return (
    <ListSectionContainer>
      {/* Display favorite movies as a list with max three movie pictures on each line */}
      <MediaListContainer>
        {favorites.map((favorite) => (
          <MediaItem key={favorite.id_favourites}>
            <Image src={favorite.avatar}/>
            <MediaTitle>{favorite.name}</MediaTitle>
          </MediaItem>
        ))}
      </MediaListContainer>
    </ListSectionContainer>
  );
};

export default ListSection;