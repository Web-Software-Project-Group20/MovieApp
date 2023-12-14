import React from 'react';
import styled from 'styled-components';
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import GeneralInfo from '../components/settingsComponents/GeneralInfo';
import UserInfo from '../components/settingsComponents/UserInfo';
import GroupInfo from '../components/settingsComponents/GroupInfo';
import SignOut from '../components/settingsComponents/SignOut';
import { useLogin } from '../components/contexts/LoginContext';

function Settings() {
  const { isLoggedIn } = useLogin();

  return (
    <>
      <div className='container'>
        <Global />
        <div className='header'>
          <header>
            <Header />
          </header>
        </div>
        <div className='content'>
          <nav>
            <NavBar />
          </nav>
          <div className='side-section'>
            <div style={{ position: 'fixed' }}>
              <NavSet>
                <ButtonContainer>
                  <NavItem href="#general">General</NavItem>
                  <NavItem href="#user">User</NavItem>
                  <NavItem href="#group">Group</NavItem>
                  {isLoggedIn && <NavItem href="#signout">Sign Out</NavItem>}
                </ButtonContainer>
              </NavSet>
            </div>
          </div>
          <MainContent>
            <div id="general" style={InfoContainer}>
              <GeneralInfo />
            </div>
            <div id="user" style={InfoContainer}>
              <UserInfo />
            </div>
            <div id="group" style={InfoContainer}>
              <GroupInfo />
            </div>
            {isLoggedIn && (
              <div id="signout" style={InfoContainer}>
                <SignOut />
              </div>
            )}
          </MainContent>
        </div>
      </div >
    </>
  );
}

const MainContent = styled.main`
  justify-content: center;
  max-width: 100%;
  padding-bottom: 20px;
  align-items: center;

  @media (max-width: 1000px) {
    padding-bottom: 6rem;
  }
`;

const InfoContainer = {
  width: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px auto',
};

const NavSet = styled.div`
  margin-top: 35px;
  width: 20%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  

  @media (max-width: 950px) {
    display: none;
    flex-direction: row;
    
  }
`;

const NavItem = styled.a`
width: 50px;
background-color: #45575C;
border: none;
border-radius: 50px;
color: #F3F3E7;
padding: 1rem 7rem;
font-size: 18px;
margin: 1rem 0;
cursor: pointer;
font-family: 'Montserrat', sans-serif;

&:hover {
  background-color: #c4a74795;
  color: #F6F6F6;
    text-decoration: none;
}

@media (max-width: 1000px) {
  display: none;
`;

export default Settings;
