import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import ErrorHandler from './ErrorHandler';

const UserModal = ({ isOpen, onClose, firstName, lastName, avatar, setFirstName, setLastName, setAvatar }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedAvatar, setEditedAvatar] = useState(avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleFirstNameChange = (e) => {
    setEditedFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setEditedLastName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const avatarUrl = 'https://api.dicebear.com/7.x/identicon/svg';
    const randomSeed = Math.random().toString(36).substring(7);
    const randomAvatarUrl = avatarUrl + `?seed=${randomSeed}`;
    setEditedAvatar(randomAvatarUrl);
  }

  const handleSaveChanges = () => {
    setIsLoading(true);

    const user = {
      fname: editedFirstName,
      lname: editedLastName,
      avatar: editedAvatar
    };

    axios.put('http://localhost:3001/users/edit', user, { withCredentials: true })
      .then((res) => {
        const user = res.data.dbResult;
        setFirstName(user.fname);
        setLastName(user.lname);
        setAvatar(user.user_avatar);
        setIsLoading(false);
        handleCloseModal();
      })
      .catch((error) => {
        setError({ statusCode: error.response?.status, message: error.response.data.error || error.message })
        setTimeout(() => {
          handleCloseModal();
        }, 3000);
      });
  };

  if (error) {
    return (
      <Modal ref={modalRef}>
        <ModalContainer>
          <ErrorHandler statusCode={error.statusCode} message={error.message} />
        </ModalContainer>
      </Modal>
    )
  }

  return (
    <Modal ref={modalRef}>
      <ModalContainer>
        <AvatarContainer>
          <Avatar src={editedAvatar} />
          <ChangeAvatarButton onClick={(e) => handleAvatarChange(e)}>Change Avatar</ChangeAvatarButton>

        </AvatarContainer>
        <InputContainer>
          <TextField htmlFor="firstName">First Name:</TextField>
          <Input
            type="text"
            id="firstName"
            value={editedFirstName}
            onChange={handleFirstNameChange}
          />
          <TextField htmlFor="lastName">Last Name:</TextField>
          <Input
            type="text"
            id="lastName"
            value={editedLastName}
            onChange={handleLastNameChange}
          />
        </InputContainer>
        <ButtonContainer>
          <SaveButton onClick={handleSaveChanges}>{isLoading ? 'Saving...' : 'Save'}</SaveButton>
          <CloseButton onClick={handleCloseModal}>Close</CloseButton>
        </ButtonContainer>
      </ModalContainer >
    </Modal>
  );
};

export default UserModal

const Modal = styled.dialog`
  background-color: #2F3F41;
  opacity: 100%;
  size: 100%;
  border: none;
  border-radius: 20px;
  padding: 1rem;
  color: #F3F3E7;
  font-family: Montserrat;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 2rem;
`;

const AvatarContainer = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChangeAvatarButton = styled.button`
  background-color: #45575C;
  color: #F3F3E7;
  border: none;
  height: 1.5rem;
  width: 8rem;
  border-radius: 50px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background-color: #F6F6F630;
    color: #F6F6F6;
    text-decoration: none;
  }
`;

const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2rem;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 1rem;
`;

const TextField = styled.label`
  background-color: #45577;
  padding: 1rem 0.5rem;
  border-radius: 50px;
  text-align: left;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  color: #F3F3E7;
`;

const Input = styled.input`
  text-align: left;
  padding: 0.5rem;
  width: auto;
  height: 1.7rem;
  border: none;
  font-size: 1rem;
  border-bottom: 1px solid #F3F3E760;
  background-color: #2F3F41;
  color: #F3F3E7;
  font-family: Montserrat;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const CloseButton = styled.button`
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

const SaveButton = styled.button`
  background-color: #45575C;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    background-color: #c4a74795;
  }
`;