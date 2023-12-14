import React, { useState } from "react";
import styled from "styled-components";

const GenreButton = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleList = () => {
    console.log('Toggle List function called');
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log('Option Clicked:', option);
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <GenreButtonWrapper>
      <Button onClick={toggleList}>
        {selectedOption ? selectedOption : label}
        {isOpen && (
  <List isOpen={isOpen}>
    {options.map((option, index) => (
      <ListItem key={index} onClick={() => handleOptionClick(option)}>
        {option}
      </ListItem>
    ))}
  </List>
        )}
      </Button>
    </GenreButtonWrapper>
  );
};

const ButtonGroup = ({ onSelectMediaType, onSelectSortBy, onSelectGenre }) => {

  const [selectedMediaType, setSelectedMediaType] = useState("All");
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const mediaTypeOptions = ["All", "Movies", "Shows"];
  const sortByOptions = ["Sort By", "Now Playing", "Popular", "Top Rated"];
  const genreOptions = ["Genres", "Animation", "Comedy", "Crime", "Drama", "Family"];

  const handleMediaTypeSelect = (option) => {
    setSelectedMediaType(option);
    onSelectMediaType(option);
  };

  const handleSortBySelect = (option) => {
    setSelectedSortBy(option);
    onSelectSortBy(option);
  };

  const handleGenreSelect = (option) => {
    setSelectedGenre(option);
    onSelectGenre(option);
  };

  return (
    <ButtonsWrapper>
      <GenreButton
        options={mediaTypeOptions}
        label={selectedMediaType}
        onSelect={handleMediaTypeSelect}
      />
      <GenreButton
        options={sortByOptions}
        label={selectedSortBy}
        onSelect={handleSortBySelect}
      />
      <GenreButton
        options={genreOptions}
        label={selectedGenre}
        onSelect={handleGenreSelect}
      />
    </ButtonsWrapper>
  );
};

const Button = styled.button`
background-color: #45575C;
  padding: 4px;
  width: 100%;
  border-radius: 18px;
  cursor: pointer;
  font-size: 18px;
  color: #F6F6F6;
  border: none;
  
  @media (max-width: 900px) {
    width: 100px;
  }
`;
const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  z-index: 2;
  width: 400px;
  position: absolute;
  left: 125px;
  }
`;

const List = styled.ul`
position: relative;
left: 50%;
transform: translateX(-50%);
width: 100%;
z-index: 1;
padding: 1vw;
display: ${(props) => (props.isOpen ? "block" : "none")};
list-style: none;
`;

const ListItem = styled.li`
  text-align: center;
  margin-bottom: 8px;
`;

const GenreButtonWrapper = styled.div`
margin-top: 30px;
  align-items: center;
  margin-right: 5px;
`;

export default ButtonGroup;
