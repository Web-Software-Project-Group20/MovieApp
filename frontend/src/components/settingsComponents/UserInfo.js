import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import InfoContainer from './InfoContainer'
import UserModal from './UserModal'
import ErrorHandler from './ErrorHandler'
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isLoggedIn, logout } = useLogin();

  const handleEditAccount = () => {
    setIsModalOpen(true);
  };

  const handleDeleteAccount = () => {
    axios.delete('http://localhost:3001/users/delete', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        logout();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setError({ statusCode: error.response?.status, message: error.response.statusText || error.message })
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  //retrieve user info from database with axios, URL will be /users/profile
  useEffect(() => {
    axios.get('http://localhost:3001/users/profile', { withCredentials: true })
      .then((res) => {
        const user = res.data.userInfo
        setUsername(user.uname);
        setFirstName(user.fname);
        setLastName(user.lname);
        setEmail(user.email);
        setAvatar(user.user_avatar);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (!isLoggedIn) {
    return (
      <InfoContainer>
        <h2>You have to sign in to view user profile</h2>
      </InfoContainer>
    )
  }

  return (
    <InfoContainer>
      {isModalOpen && (
        <Backdrop>
          <UserModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setAvatar={setAvatar}
          />
        </Backdrop>
      )}

      {isLoading ? <h2>Loading...</h2> :
        <>
          <AvatarContainer>
            <Avatar src={avatar} />
            <Username>{username}</Username>
          </AvatarContainer>
          <DetailsContainer>
            <DetailHeader>First Name</DetailHeader>
            <Detail>{firstName}</Detail>
            <DetailHeader>Last Name</DetailHeader>
            <Detail>{lastName}</Detail>
            <DetailHeader>Email</DetailHeader>
            <Detail>{email}</Detail>
          </DetailsContainer>
          <ButtonContainer>
            <EditButton onClick={handleEditAccount}>Edit Account</EditButton>
            <DeleteButton onClick={handleDeleteAccount}>Delete Account</DeleteButton>
          </ButtonContainer>
        </>}
      {error && <ErrorHandler statusCode={error.statusCode} message={error.message} />}
    </InfoContainer>
  )
}

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailHeader = styled.h4`
  font-size: 14px;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const Detail = styled.h4`
  background-color: #45575C;
  padding: 1rem;
  border-radius: 50px;
  text-align: center;
  font-size: 14px;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 2rem;
`;

const Username = styled.h3`
  font-size: 24px;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #80000070;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    background-color: #800000;
  }
`;

const EditButton = styled.button`
  background-color: #45575C;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    background-color: #F6F6F640;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Adjust the opacity as needed */
  backdrop-filter: blur(5px); /* Apply the blur effect */
  z-index: 999; /* Make sure it's above other elements */
`;

export default UserInfo

