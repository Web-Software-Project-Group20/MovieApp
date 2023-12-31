import React, { useEffect, useState } from 'react'
import GroupListItem from './GroupListItem'
import styled from 'styled-components'
import axios from 'axios'
import ErrorHandler from '../settingsComponents/ErrorHandler'

const backendurl = process.env.REACT_APP_BACKENDURL;

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${backendurl}/groups`, { withCredentials: true })
      .then((res) => {
        setGroups(res.data.allGroups);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError({ message: error.response?.data?.error || error.message })
      });
  }, []);

  if (error || message) {
    const timerId = setTimeout(() => {
      if (error) {
        setError(null);
      } else {
        setMessage('');
      }
      clearTimeout(timerId); // Clear the timeout once it's executed to avoid unnecessary calls
    }, 3000);
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <ErrorHandler message={error.message} />}
      {message && <p>{message.message}</p>}
      <ListItemContainer>
        {!isLoading && groups.map((group) => {
          return (
            <>
              <GroupListItem
                key={group.id_groups}
                setError={setError}
                setMessage={setMessage}
                groupId={group.id_groups}
                groupName={group.groups_name}
                avatar={group.groups_avatar}
                description={group.groups_description}
              />
            </>
          )

        })}
      </ListItemContainer>
    </>
  )
}

export default GroupsList

const ListItemContainer = styled.div`
justify-content: space-evenly;
  display: grid;
  grid-template-columns: repeat(3, 3fr);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 2fr);
  }
`;