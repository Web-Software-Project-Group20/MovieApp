import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import ErrorHandler from './ErrorHandler';
import Invites from './Invites';

const MODALCLOSE = 2000;
const ERRORCLOSE = 3000;

const GroupModal = ({ isOpen, onClose, groupName, groupId, avatar, setEdited }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGroupName, setEditedGroupName] = useState(groupName);
  const [editedAvatar, setEditedAvatar] = useState(avatar);
  const [buttonText, setButtonText] = useState('Rename');
  const [isMembersLoading, setMembersLoading] = useState(false);
  const [isEditLoading, setEditLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  const fetchMembers = () => {
    axios.get(`http://localhost:3001/groups/members/${groupId}`, { withCredentials: true })
      .then((res) => {
        setMembers(res.data.groupMembers);
        setMembersLoading(false);
      })
      .catch((error) => {
        console.error('Axios error: ', error);
        setError({ statusCode: error.response?.status, message: error.response.data.error || error.message })
      });
  }

  useEffect(() => {
    setMembersLoading(true);
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
    axios.get(`http://localhost:3001/groups/members/${groupId}`, { withCredentials: true })
      .then((res) => {
        setMembers(res.data.groupMembers);
        setMembersLoading(false);
      })
      .catch((error) => {
        setError({ statusCode: error.response?.status, message: error.response.data.error || error.message })
      });

  }, [isModalOpen, groupId]);

  const handleButtonChange = () => {
    if (isEditing) {
      setButtonText('Rename');
    }
    else {
      setButtonText('Save');
    }
    setIsEditing(!isEditing);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleDeleteGroup = () => {
    axios.delete(`http://localhost:3001/groups/delete/${groupId}`, { withCredentials: true })
      .then((res) => {
        setEdited(true);
        handleCloseModal();
      })
      .catch((error) => {
        setError({ statusCode: error.response?.status, message: error.response.data.error || error.message })
      });
  }

  const handleDeleteMember = (groupId, memberId) => {
    const data = {
      groupId: groupId,
      userId: memberId
    }

    axios.delete(`http://localhost:3001/groups/members/delete`, { data, withCredentials: true })
      .then((res) => {
        console.log(res.data);
        axios.get(`http://localhost:3001/groups/members/${groupId}`, { withCredentials: true })
          .then((res) => {
            setMembers(res.data.groupMembers);
          })
          .catch((error) => {
            setError({ statusCode: error.response?.status, message: error.response.data.error || error.message })
          });
      })
      .catch((error) => {
        setError({ statusCode: error.response?.status, message: error.response.data.error || error.message })
      });

    setTimeout(() => {
      setError(null);
    }, ERRORCLOSE);
  }

  const handleGroupNameChange = (e) => {
    setEditedGroupName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const avatarUrl = 'https://api.dicebear.com/7.x/identicon/svg?scale=50';
    const randomSeed = Math.random().toString(36).substring(7);
    const randomAvatarUrl = avatarUrl + `&seed=${randomSeed}`;
    setEditedAvatar(randomAvatarUrl);
  }

  const handleSaveChanges = () => {
    setEditLoading(true);
    let group;

    if (groupName === editedGroupName) {
      group = {
        groupName: '',
        groupAvatar: editedAvatar
      };

    } else {
      group = {
        groupName: editedGroupName,
        groupAvatar: editedAvatar
      };
    }

    axios.put(`http://localhost:3001/groups/edit/${groupId}`, group, { withCredentials: true })
      .then((res) => {
        setTimeout(() => {
          setEditLoading(false);
          setEdited(true);
          handleCloseModal();
        }, MODALCLOSE);

      })
      .catch((error) => {
        setEditLoading(false);
        setError({ message: error.response.data.error || error.message })
      });
  };

  if (error) {
    const timerId = setTimeout(() => {
      setError(null);
      clearTimeout(timerId);
    }, ERRORCLOSE);
  }

  return (
    <Modal ref={modalRef}>
      <ModalContainer>
        <AvatarContainer>
          <Avatar src={editedAvatar} />
          <NameContainer>
            {isEditing ? (
              <Input
                type="text"
                value={editedGroupName}
                onChange={handleGroupNameChange}
              />
            ) : (
              <GroupName>{editedGroupName}</GroupName>
            )}
            <ButtonContainer>
              <EditButton onClick={handleButtonChange}>{buttonText}</EditButton>
              <EditAvatarButton onClick={(e) => handleAvatarChange(e)}>Change Avatar</EditAvatarButton>
            </ButtonContainer>
          </NameContainer>
        </AvatarContainer>
        <HeaderContainer>
          <Header>Members</Header>
          {<AddMemberButton>+ Add</AddMemberButton>}
        </HeaderContainer>
        <MembersContainer> {isMembersLoading ? <h2>Loading...</h2> :
          <>
            {members.map(member => {
              return (
                <>
                  <SingleMemberContainer>
                    <MemberAvatar src={member.user_avatar} />
                    <Header key={member.id_users}>{member.uname}</Header>
                    <DeleteMemberButton onClick={() => handleDeleteMember(groupId, member.id_users)}>X</DeleteMemberButton>
                  </SingleMemberContainer>
                </>
              )
            })
            }
          </>}
        </MembersContainer>
        <HeaderContainer>
          <Header>Invites</Header>
        </HeaderContainer>
        <InviteContainer>
          <Invites
            groupId={groupId}
            error={error}
            setError={setError}
            fetchMembers={fetchMembers}
          />
        </InviteContainer>
        {error &&
          <>
            <ErrorHandler
              statusCode={error.statusCode}
              message={error.message}
            />
          </>}
        <ButtonContainer>
          <SaveButton onClick={handleSaveChanges}>{isEditLoading ? 'Saving...' : 'Save'}</SaveButton>
          <Button onClick={handleCloseModal}>Close</Button>
          <DeleteButton onClick={() => handleDeleteGroup()}>Delete Group</DeleteButton>
        </ButtonContainer>
      </ModalContainer >
    </Modal>
  );
};

export default GroupModal

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

const MemberAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const GroupName = styled.h4`
  font-size: 1.5rem;
  text-align: left;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2rem;
`;

const InviteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.h4`
  font-size: 1.25rem;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SingleMemberContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

const Input = styled.input`
  text-align: left;
  padding: 1rem;
  width: auto;
  height: 1rem;
  border: none;
  font-size: 1.5rem;
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

const AddMemberButton = styled.button`
  background-color: #45575C;
  font-size: 0.8rem;
  width: 4rem;
  color: #F3F3E7;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 1rem 0;
  &:hover {
    background-color: #F6F6F640;
  }
`;

const DeleteMemberButton = styled.button`
  background-color: #80000070;
  color: #F3F3E7;
  border: none;
  border-radius: 100px;
  padding: 0.25rem 1rem;
  margin-left: auto;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #800000;
  }
`;

const Button = styled.button`
  background-color: #45575C;
  color: #F3F3E7;
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
  color: #F3F3E7;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    background-color: #c4a74795;
  }
`;

const EditButton = styled.button`
  background-color: #45575C;
  color: #F3F3E7;
  height: 1.5rem;
  width: 5rem;
  margin-left: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #F6F6F640;
  }
`;

const EditAvatarButton = styled.button`
  background-color: #45575C;
  color: #F3F3E7;
  height: 1.5rem;
  width: 10rem; 
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #F6F6F640;
  }
`;

const DeleteButton = styled.button`
  background-color: #80000070;
  color: #F3F3E7;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  cursor: pointer;

  &:hover {
    background-color: #800000;
  }
`;