import React from 'react'
import styled from "styled-components";

const GroupFavouriteAvatar = ({ groupData }) => {
  if (!groupData) {
    return null;
  }
  return (
    <>
      <AvatarContainer>
        <Picture src={groupData.groups_avatar} />
        <Username>{groupData.groups_name}'s Favourites</Username>
      </AvatarContainer>
    </>
  )
}
const AvatarContainer = styled.div`
    text-align: center;
    align-items: center;
    display: flex;  
    flex-direction: column;
    border-bottom: 1px solid white;
`;
const Picture = styled.img`
    width: 188px;
    height: 188px;
    border-radius: 50%;
`;

const Username = styled.h1`
`;


export default GroupFavouriteAvatar