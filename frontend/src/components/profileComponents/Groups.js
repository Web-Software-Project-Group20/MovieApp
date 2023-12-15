import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import GroupModal from '../profileComponents/groupModal';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Groups = (props) => {
    const [groups, setGroups] = useState(props.groupsData);
    const {username}  = useParams();

    const createGroup = (group) => {
      if (group.id_groups === 0 && !username) {
        openModal();
      }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    useEffect(() => {
      fetchGroups();
    }, []);
  
const fetchGroups = () => {
  const fetchData = async () => {
    try {
      if (!username) {
        const res = await axios.get('http://localhost:3001/groups/mygroups', { withCredentials: true });
        setGroups(res.data.Groups);
      } else {
        const profileRes = await axios.get('http://localhost:3001/users/profile/' + username, { withCredentials: true });
        const groupsRes = await axios.get('http://localhost:3001/groups/mygroups/' + profileRes.data.userInfo.id_users, { withCredentials: true });
        setGroups(groupsRes.data.Groups);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };
  fetchData();
};

const handleGroupCreated = () => {
  fetchGroups(); 
};

  return (
      <>
      <Section>Groups</Section>
      <GroupContainer>
      {!username && (
        <Group key={0} onClick={() => createGroup({ id_groups: 0, groups_name: 'Create new', groups_avatar: 'https://placehold.co/99x99?text=New' })}>
            <GroupIcon src="https://placehold.co/99x99?text=New" alt="Create new" />
            <GroupName>Create new</GroupName>
        </Group>
      )}
      {groups && groups.map((group) => (
        <Group key={group.id_groups} onClick={() => createGroup(group)}>
          <GroupIcon src={group.groups_avatar} alt={group.groups_name} />
          <GroupName>{group.groups_name}</GroupName>
        </Group>
      ))}
      <GroupModal isOpen={isModalOpen} onClose={closeModal} onGroupCreated={handleGroupCreated} />
      </GroupContainer>
    </>
  );
};

const Section = styled.h2`
margin-left: 4rem;
margin-top: -2rem;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 4rem;
  margin-left: 3rem;
  border-bottom: 1px solid white;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
  opacity: 1;
  width: calc(20% - 2rem); /* Set a fixed width for each group and subtract margin */
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const GroupIcon = styled.img`
  width: 70px;
  height: 70px; 
  border-radius: 50%;
`;

const GroupName = styled.h3`
  margin-top: 1rem;
  font-size: 1rem; 
`;


export default Groups
