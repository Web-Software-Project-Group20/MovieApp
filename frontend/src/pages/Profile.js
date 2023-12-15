import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import Avatar from '../components/profileComponents/Avatar'
import Groups from '../components/profileComponents/Groups'
import Favourites from '../components/profileComponents/Favourites'
import Comments from '../components/profileComponents/Comments'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Profile() {

  const [avatarName, setAvatarName] = useState('');
  const [groups, setGroups] = useState('');
  const [favourites, setFavourites] = useState('');
  const [byId, setId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {username}  = useParams();
  const dataBaseLink = 'http://localhost:3001/'

useEffect(() => {
  
  const fetchData = async () => {
  setLoading(true);
  if (!username) {
    try {
      const avatarRes = await axios.get(dataBaseLink + 'users/profile', { withCredentials: true });
      setAvatarName(avatarRes.data.userInfo);
    } catch (error) {
      console.error(error);
    }

    try {
      const groupsRes = await axios.get(dataBaseLink + 'groups/mygroups', { withCredentials: true });
      setGroups(groupsRes.data.Groups);
    } catch (error) {
      
    }
    try {
      const favouritesRes = await axios.get(dataBaseLink + 'favourites/from', { withCredentials: true });
      setFavourites(favouritesRes.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  } else {
    try {
      const profileRes = await axios.get(dataBaseLink + 'users/profile/' + username, { withCredentials: true });
      setAvatarName(profileRes.data.userInfo);
      setId(profileRes.data.userInfo.id_users);
    } catch (error) {
      console.error(error);
    } 

    if (byId) {
      try {
        const groupsRes = await axios.get(dataBaseLink + 'groups/mygroups/' + byId, { withCredentials: true });
        setGroups(groupsRes.data.Groups);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }
};
fetchData();
}, [username, byId]);

return (
  <div className="container">
    <Global />
    <header>
      <Header />
    </header>
    <Content className="content">
      <nav>
        <NavBar />
      </nav>
      <main>
        <div className="avatarName">
          <Avatar userData={avatarName}/>
        </div>
        <div className="groups">
          <Groups groupsData={groups}/>
        </div>
        {!username && (
          <div className="favourites">
            {!isLoading && (<Favourites favouritesData={favourites} />)}
          </div>
        )}
        </main>
        <div className="side-section">
          {!isLoading && (<Comments userId={byId} />)}
        </div>
    </Content>
    </div>
  );
}

const Content = styled.div`
max-width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
export default Profile