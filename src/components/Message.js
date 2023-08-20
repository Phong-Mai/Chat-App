import { Avatar } from '@mui/material';
import React from 'react'
import  styled  from 'styled-components'
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import Auth from '../auth/Auth';
import DeleteIcon from '@mui/icons-material/Delete';
import { arrayRemove, arrayUnion, deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/roomSlice';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const MessageContainer = styled.div`
    display:flex;
    align-items: center;
    margin-left: 10px;
    > img {
        height: 50px;
        border-radius: 8px;
    }
`;
const MessageInfo = styled.div`
    padding-left:10px;
   
    > h4 > span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
    }
    .icon > span {
       :hover{
            background-color: red;
        }
    }
`;
// const DeleteIconStyled = styled.span`
//     justify-content: flex-end;
// `;
function Message({message}) {
    const user = Auth();
    const roomId = useSelector(selectRoomId);
    const [show, setShow] = useState('none');
    const [icon, setIcon] = useState()
    const icons = ["😀","🥰","😚","😡","🤣"]
   const handleOnMouseEnter=() => {
    setShow('')
   }
   const handleOnMouseLeave= () =>{
    setShow('none')
   }
   const handleSendEmoji = (icon) => {
    setIcon(icon)
   }
   const handleDeleteMessage = async (ms) => {
    const result = window.confirm("Bạn có chắc xóa tin nhắn");
        if(result){
            const roomRef= doc(db, "rooms", roomId);
        await updateDoc(roomRef, {
            messages: arrayRemove(ms)
        })
        }
    return
}
  return (
   <div style={{display:'flex',flexDirection: user?.uid === message?.uid ? 'row-reverse' : ''}}>
    <MessageContainer style={{flexDirection: user?.uid === message?.uid ? 'row-reverse' : '', marginRight:10}}>
        <Avatar alt={user?.displayName} src={message?.userImage} />
        <Tooltip  placement='right-end'>
        <MessageInfo  style={{ display:'flex', flexDirection:'column',marginRight:10 }} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <h4 style={{display:'flex',flexDirection: user?.uid === message?.uid ? 'row-reverse' : ''}}>
                {message?.user && message.user}
                <span style={{marginRight:10}}>{message?.timestamp }</span>
            </h4>
            <span style={{display:'flex',flexDirection: user?.uid === message?.uid ? 'row-reverse' : ''}}>{message?.message && message?.message}</span>     
          {message?.file && <img width={300} src={message.file}/>}  
            <div className='icon' style={{display:show}}>{icons.map((icon, index) => (
                <span key={index} style={{cursor:'pointer'}} onClick={() =>handleSendEmoji(icon)}>{icon} </span>
            ))}</div>
         <div style={{display:'flex', justifyContent:'flex-end'}}>
            <span onClick={()=>handleDeleteMessage(message)}  style={{display: user?.uid === message?.uid ? show :'none'}}>
                <DeleteIcon color='action' />
            </span>
            </div>
        </MessageInfo>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
        <span>{icon && icon}</span>
        </div>
        </Tooltip>
    </MessageContainer>
   </div>

 
  )
}

export default Message
