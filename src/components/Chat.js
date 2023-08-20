import React, { useEffect, useRef, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/roomSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import ChatInput from './ChatInput';
import Message from './Message';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import HoverRating from './HoverRating';
import { Tooltip } from '@mui/material';
import Youtube from './Youtube/Youtube';
function Chat() {
  const [openPicker, setOpenPicker] = useState(false)
  const chatRef = useRef(null)
  const roomId = useSelector(selectRoomId);
  const [roomName, setRoomName] = useState()
  const [roomMessages, setRoomMessages] = useState()
  const arrUserImage = Array.from(new Set(roomMessages?.map((img) => img.userImage)))
  useEffect(() => {
    if (roomMessages || roomId) {
      const unsub = onSnapshot(doc(db, "rooms", roomId), (doc) => {
        if (doc.exists()) {
          setRoomMessages(doc.data().messages)
          setRoomName(doc.id)
        }
      })
    }

  }, [roomId])
  useEffect(() => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [roomId, roomMessages])

  return (
    <ChatContainer onClickCapture={() => setOpenPicker(false)}>
      {roomId === "Youtube"  ?  
      <Youtube/> :
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>{roomName && roomName}</strong>
            </h4>
            {/* <StarOutlineIcon/> */}
            <HoverRating />
          </HeaderLeft>
          <HeaderRight>
            <p>
              <InfoIcon />
              Details
            </p>
            <Tooltip style={{maxWidth:500}}  title= {arrUserImage?.map((avatar, index) => (
                  <Avatar  key={index} alt="Remy Sharp" src={avatar} />
                ))} arrow>
            <AvatarGroup max={3} style={{cursor:'pointer'}}>
              {arrUserImage?.map((avatar, index) => (
                  <Avatar key={index} alt="Remy Sharp" src={avatar} />
                ))}

            </AvatarGroup>
          </Tooltip>
         
          </HeaderRight>
        </Header>
        <ChatMessages>
          {roomMessages?.map((message, index) => (
            <Message
              key={index}
              message={message}
            />
          ))}
          <ChatBottom
            ref={chatRef}
          />
        </ChatMessages>
        <ChatInput
          chatRef={chatRef}
          channelName={roomName}
          channelId={roomId}
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
        />
      </>
      }
    </ChatContainer>
  )
}
export default Chat
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  >h4 {
    display: flex;
 
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  };
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  };
`;
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  height: calc(90vh - 50px);
  margin-top:60px;
`;
const ChatMessages = styled.div`
  height: 100vh;
`;
const ChatBottom = styled.div`
`;