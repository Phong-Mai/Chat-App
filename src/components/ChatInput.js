import React, {  useState } from 'react'
import Button from '@mui/material/Button';
import styled from 'styled-components'
import {  db, storage } from '../firebase/config';
import {  useSelector } from 'react-redux';
import {  selectUser } from '../features/userSlice';
import {  arrayUnion, doc, updateDoc } from 'firebase/firestore';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';

import { Box } from '@mui/material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';


function ChatInput({ channelName, channelId, openPicker, setOpenPicker }) {
    const user = useSelector(selectUser)
   
    const userManual = JSON.parse(localStorage.getItem("user"))
    const [input, setInput] = useState("");
    const handleIcon = (e) => {
        setInput(input ? input + e : e)
    };
    const sendMessage = async (e) => {
        e.preventDefault()
        if (!channelId) {
            return false
        }
        if( input) {
            await updateDoc(doc(db, "rooms", channelId), {
                messages: arrayUnion({
                    uid: user?.uid || userManual?.uid,
                    message: input,
                    timestamp: new Date().toLocaleString(),
                    user: user?.displayName || userManual?.displayName,
                    userImage: user?.photoURL ? user?.photoURL : userManual?.photoURL || "https://icon-icons.com/icon/avatar-default-user/92824",
                    file:  null
                })
        })
    }
        setInput('');
      
    }
    const handlePicker = () => {
        setOpenPicker(!openPicker)
    }
    const handleSendFile = (file) => {
        if(!file){
            return
        }
        const storageRef = ref(storage, user.displayName + channelId +file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed", 
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error) => {
                console.log(error);}, 
            () => {
         getDownloadURL(uploadTask.snapshot.ref ).then(async (downloadURL) => {
              await updateDoc(doc(db, "rooms", channelId), {
                messages: arrayUnion({
                    uid: user?.uid || userManual?.uid,
                    message: input,
                    timestamp: new Date().toLocaleString(),
                    user: user?.displayName || userManual.username,
                    userImage: user?.photoURL || "https://icon-icons.com/icon/avatar-default-user/92824",
                    file: downloadURL 
                })
        })
      
              });
            }
          );   
          
    }  
    return (
        <ChatInputContainer>
            <form>
                <input
                    value={input}
                    placeholder={channelName && `Message #${channelName}`}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Box sx={{ display: openPicker ? "inline" : "none", position: 'fixed', bottom: 80, right: 80, width:300 }}>
                    <Picker data={data} onEmojiSelect={(e) => handleIcon(e.native)} />
                </Box>

                <div className='Icon'>
                    <label htmlFor='files'><AttachFileOutlinedIcon /></label>
                    <input style={{display:'none'}} onChange={(e)=> handleSendFile(e.target.files[0])} id='files' type='file'/>
               
                    <span  onClickCapture={handlePicker}><SentimentSatisfiedOutlinedIcon /></span>
                </div>
                <Button className='SendButton' hidden type="submit" onClick={sendMessage}>Send</Button>
            </form>


        </ChatInputContainer>

    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    > form {
        display: flex;
        justify-content: center;
        border-radius: 20px;  
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        width: 50%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
    .Icon {
        position: fixed;
        bottom: 30px;
        left: 77%;
        padding: 15px;
       outline:none;
    }
    .Icon > span,label {
        :hover{
            color: #CC33FF;
        }
    }
    .SendButton {
          display: none !important;
    }
`;