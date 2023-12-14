import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Import your components here
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import FavouriteAvatar from '../components/groupsComponents/groupFavouriteAvatar';
import AllFavourites from '../components/groupsComponents/GroupAllFavourites';

function GroupFavouriteDetails({ groupId }) {
  const [avatarName, setAvatarName] = useState('');
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Fetch Group Info including Avatar and Username
    axios.get(`http://localhost:3001/groups/${groupId}/favouritedetails`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setAvatarName(res.data.getGroupInfo);
      })
      .catch((error) => {
        console.error('Error fetching group info:', error);
      });

    // Fetch User's favorites
    axios.get('http://localhost:3001/favourites/from', { withCredentials: true })
      .then((res) => {
        setFavourites(res.data);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }, [groupId]);

  return (
    <Container>
      <Global />
      <header>
        <Header />
      </header>
      <Content>
        <nav>
          <NavBar />
        </nav>
        <main>
          <div className='top'>
            <FavouriteAvatar userData={avatarName} />
          </div>
          <div className='allfavourites'>
            <AllFavourites favouritesData={favourites} />
          </div>
        </main>
      </Content>
    </Container>
  );
}

export default GroupFavouriteDetails;

// Styled components for better organization
const Container = styled.div`
  /* Add your styles here */
`;

const Content = styled.div`
  /* Add your styles here */
`;
