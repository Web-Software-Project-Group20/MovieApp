import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ErrorHandler from '../settingsComponents/ErrorHandler';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #2E414695;
  padding: 20px;
  border-radius: 8px;
  height: 500px;
  width: 400px;
`;

const FillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30%;
`;

const CloseButton = styled.button`
  background: transparent;
  color: #EEF1DC;
  font-size: 20px;
  border: none;
  cursor: pointer;
  align-self: right;
`;

const ToggleButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
`;

const ToggleButton = styled.button`
  background: transparent;
  font-family: Montserrat;
  color: #EEF1DC;
  border: none;
  padding: 5px;
  margin: 0 20px 10px;
  cursor: pointer;
  font-size: inherit;
  font-weight: ${(props) => (props.active === 'true' ? 'bolder' : 'normal')};
  border-bottom: ${(props) => (props.active === 'true' ? '1px solid #EEF1DC;' : 'none')};
`;

const Label = styled.label`
  color: #EEF1DC;
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  background: transparent;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #F3F3E760;
  color: #F3F3E7;
`;

const SubmitButton = styled.button`
  width: 50%;
  background: #45575C;
  color: #EEF1DC;
  border: none;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 0.5rem;
  cursor: pointer;
  margin-top: 10px;
`;

const SubmitButtonContainer = styled.div`
  display: grid;
  place-items: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AvatarCircle = styled.div`
  width: 99px;
  height: 99px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChangeButton = styled.button`
width: 50%;
background: #45575C;
color: #EEF1DC;
border: none;
box-sizing: border-box;
border-radius: 50px;
padding: 0.5rem;
cursor: pointer;
margin-top: 10px;
`;

const GroupModal = ({ isOpen, onClose, onGroupCreated}) => {
  const [groupName, setGroupname] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('');
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setGroupname('');
      setDescription('');
    }
  }, [isOpen]);

  const handleCreateGroup = () => {

    setIsLoading(true);
    axios.post('http://localhost:3001/groups/create',
        { groupName: groupName, groupDescription: description, groupAvatar: avatar },
        { withCredentials: true }
      )
      .then(() => {
        onGroupCreated();
        onClose();
      })
      .catch((error) => {
        setError({ message: error.response.data.error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const avatarUrl = 'https://api.dicebear.com/7.x/identicon/svg';
    const randomSeed = Math.random().toString(36).substring(7);
    const randomAvatarUrl = avatarUrl + `?seed=${randomSeed}`;
    setAvatar(randomAvatarUrl);
  }

  if (err) {
    const ERRORTIMEOUT = 3000;
    const timerId = setTimeout(() => {
      setError(null);
      clearTimeout(timerId);
    }, ERRORTIMEOUT);
  }

  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <ToggleButtonContainer>
                <ToggleButton> Create group </ToggleButton>
              </ToggleButtonContainer>
              <CloseButton onClick={onClose}>X</CloseButton>
            </div>
            <FillContainer>
              <Label htmlFor="groupname">Group's name:</Label>
              <InputField
                type="text"
                id="groupname"
                value={groupName}
                onChange={(e) => {
                    e.stopPropagation();
                    setGroupname(e.target.value);
                }}
                />
              <Label htmlFor="description">Description:</Label>
              <InputField
                type="description"
                id="description"
                value={description}
                onChange={(e) => {
                    e.stopPropagation();
                    setDescription(e.target.value);
                }}
              />
              <Label htmlFor="avatar">Avatar:</Label>
              <AvatarContainer>
                <AvatarCircle>
                  <AvatarImage src={avatar || 'https://placehold.co/99x99?text=New'} alt="Avatar" />
                </AvatarCircle>
                <ChangeButton onClick={(e) => handleAvatarChange(e)}>Change</ChangeButton>
              </AvatarContainer>
              <SubmitButtonContainer>
                <SubmitButton onClick={handleCreateGroup}>
                  {isLoading ? 'Creating group...' : 'Create Group'}
                </SubmitButton>
              </SubmitButtonContainer>
              {err && <ErrorHandler message={err.message} />}
            </FillContainer>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default GroupModal;
