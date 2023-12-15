import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import Avatar from '../components/profileComponents/Avatar'
import Groups from '../components/profileComponents/Groups'
import Favourites from '../components/profileComponents/Favourites'
import Comments from '../components/profileComponents/Comments'
import axios from 'axios';

function Profile() {

  const [avatarName, setAvatarName] = useState('');
  const [groups, setGroups] = useState('');
  const [favourites, setFavourites] = useState('');
useEffect(() => {
      
}, []);

  return (
    <div className="container">
      <Global />
      <header>
        <Header />
      </header>
      <div className="content">
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
          <div className="favourites">
            <Favourites favouritesData={favourites}/>
          </div>
        </main>
        <div className="side-section">
          <Comments/>
        </div>
      </div>
    </div>
  );
}

export default Profile