import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const backendurl = process.env.REACT_APP_BACKENDURL;

const MessageSection = ({ groupId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchGroupMessages();
  }, []);

  const fetchGroupMessages = () => {
    // Make an Axios request to fetch messages from the server
    console.log('groupId', groupId)
    axios.get(`${backendurl}/comments?id_groups=${groupId}`, { withCredentials: true })
      .then((res) => {
        // Assuming the response data is an array of messages
        setMessages(res.data.getComments);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        user_comments: newMessage,
        id_groups: groupId
      }
      axios.post(`${backendurl}/comments/comment`, messageData, { withCredentials: true })
        .then((res) => {
          fetchGroupMessages()
        })
        .catch((error) => {
          console.error('Error', error);
        })
      setNewMessage('')
    }
  };

  return (
    <MessageContainer>
      <MessageAmount>
        <Section>Messages</Section>
        <Number>{messages.length}</Number>
      </MessageAmount>
      <MessagesContainer>
        {messages.map((message) => (
          <Message key={message.id_comments}>
            <AvatarContainer>
            </AvatarContainer>
            <MessageContent>
              <Sender>{message.username}</Sender>
              <MessageText>{message.comment}</MessageText>
            </MessageContent>
          </Message>
        ))}
      </MessagesContainer>
      <SendMessageContainer>
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </SendMessageContainer>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  margin: 10px;
  width: 420px;
  height: 681px;
  margin-bottom: 100px;
`;

const MessagesContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: auto;
  padding: 10px;
  height: 80%;
`;

const Message = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const AvatarContainer = styled.div`
  padding-right: 10px;
`;

const MessageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Sender = styled.h3`
  margin: 0;
`;

const MessageText = styled.p`
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
`;

const SendMessageContainer = styled.div`
  display: flex;
  padding-top: 10px;
`;

const Input = styled.input`
background-color: #45575C;
flex: 1;
padding: 8px;
padding-right: 8px;
border-radius: 8px;
border: none;
color: #F3F3E7;

&::placeholder {
  color: #F3F3E7;
}
`;

const Button = styled.button`
  padding: 8px 12px;
  background-color: #45575C;
  color: #F3F3E7;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c4a747;
    color: #14333D;
  }
`;

const Section = styled.h2`
  padding: 0 0 10px;
`;

const MessageAmount = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.h3`
  margin-left: 1rem;
  padding: 0.5rem;
  border: 1px solid grey;
  border-radius: 20px;
  display: inline-block;
`;

const Avatar = styled.img`
  border-radius: 50%;
`;

export default MessageSection;