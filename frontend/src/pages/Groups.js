import React, { useEffect, useState } from "react"
import axios from "axios";
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import MainSection from '../components/groupsComponents/MainSection.js';
import ListSection from '../components/groupsComponents/ListSection';
import MessageSection from "../components/groupsComponents/Messages";
import { useParams, Link } from "react-router-dom";
import { CiCircleAlert } from "react-icons/ci";
import styled from 'styled-components';

function Groups() {
  const [favorites, setFavorites] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {groupId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/favourites/from?id_groups=${groupId}`, { withCredentials: true })
      .then((res) =>{
        console.log(res.data);
        setFavorites(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
  },[])

  
  console.log('groupIdFromGroupPage', groupId)

  if(isLoading){
    return(
      <h2>Loading</h2>
    )
  }

  return (
    <div className="container"> {/*Whole page*/}
      <Global />
      <header>
        <Header />
      </header>
      <div className="content"> {/*Content for the spesific page*/}
        <nav>
          <NavBar />
        </nav>
        <main> {/*Global styling for vertical flexing*/}
          <h2>Groups</h2>
          <GroupBox> {/*Flexes avatar and info horizontally*/}
            <MainSection groupId={groupId}/>
          </GroupBox>
          <List> {/*List of movies/series*/}
            <div className="list-header">
            <h2>List</h2>
            <Link to="favouritedetails" target="_blank">
              <SeeAll>See All →</SeeAll>
          </Link> 
            </div>
            <div className="mediaList">
              <ListSection groupId={groupId} favoritesData={favorites}/>
            </div>
          </List>
          <News>
            <h2>News</h2>
            <p>News here</p>
            <p>News here</p>
            <p>News here</p>
          </News>
        </main>
        <div className="side-section">
          <MessageSection groupId={groupId}/>
        </div>
      </div>
    </div>
  );
}



const GroupBox = styled.div`
align-items: center;
  margin-left: 15px;
  display: flex; /*Flexes avatar and info horizontally*/
  align-items: center; /*Aligns avatar and info vertically*/
  border-bottom: 2px solid #F6F6F690; /*Adds a pretty line :) */
  max-width: 900px;
  `;

const SeeAll = styled.h2`
  margin-left: auto;
`;

const Avatar = styled.div`
  font-size: 200px;
  color: #F5F5F595;
  `;

const GroupInfo = styled.div`
  display: flex; /*Flexes group info evenly*/
  flex-direction: column; /*Stacks group info vertically*/
  align-items: left;
  max-width: 900px;
`;

const List = styled.div`
  display: column;
  margin-left: 15px;
  max-width: 900px;
  border-bottom: 2px solid #F6F6F690;
  padding-bottom: 20px;

  .list-header {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    width: 100%;

  }
  .mediaList { /*Add your List-component here*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
`;
const News = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  max-width: 900px;
  max-height: 450px;
`;

export default Groups;