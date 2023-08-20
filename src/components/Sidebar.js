import React, { useEffect, useState } from 'react'
import  styled  from 'styled-components'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create'
import SibarOption from './SidebarOption';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {  enterRoom, selectRoomId } from '../features/roomSlice';
import Auth from '../auth/Auth';
import ListAddChannel from './SidebarAddChannel';
import SibarInbox from './SidebarInbox';
import YouTubeIcon from '@mui/icons-material/YouTube';
 function Sidebar() {
    const dispatch = useDispatch()
  const user = Auth();
   const userManual = useSelector(selectUser)
   const handleTest = () => {
    dispatch(enterRoom({
        roomId: "Youtube"
    }))
   }
  return (
    <SidebarContainer>
        <SidebarHeader>
            <SidebarInfo>
                <h2>{user?.displayName || userManual?.displayName}</h2>
                <h3>
                    <FiberManualRecordIcon /> 
                    {user?.email || `${userManual?.username}@email.com`}
                </h3>
            </SidebarInfo>
   
            <CreateIcon />
        </SidebarHeader>
        <SibarOption Icon={InsertCommentOutlinedIcon} title="Thread"/>
        <SibarOption Icon={InboxIcon} title="Mentions & reactions"/>
        <SibarOption Icon={DraftsIcon} title="Saved items"/>
        <SibarOption Icon={BookmarkBorderIcon} title=" Channel Browser"/>
        <SibarOption Icon={PeopleAltIcon} title="People & user groups"/>
        <SibarOption Icon={AppsIcon} title="Apps"/>
        <SibarOption Icon={FileCopyIcon} title="File browser"/>
        <div onClick={handleTest}>
        <SibarOption Icon={YouTubeIcon} title="Youtube"/>
        </div>
        <hr/>
        <ListAddChannel/>
        <hr/>
        {/* <SibarInbox/> */}
        
    </SidebarContainer>
  )
}

export default Sidebar
const SidebarContainer = styled.div`
    background-color: #4a154b !important;
    color:white;
    flex:0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
    height: 100%;
    > hr {
        margin-top: 1px;
        margin-bottom: 1px
        border: 1px solid #49274b;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 10px;

    > .MuiSvgIcon-root: {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }
`;
const SidebarInfo = styled.div`
    flex: 1;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }
    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;
