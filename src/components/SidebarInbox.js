import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { enterRoom } from '../features/roomSlice';
import { useEffect } from 'react';
import styled from 'styled-components';

import { Avatar } from '@mui/material';
import { selectUser } from '../features/userSlice';
export default function SibarInbox() {
  const [searchUsername, setSearchUsername] = useState('');
  const [searchUser, setSearchUser] = useState(null)
  const [searchUserUid, setSearchUserUid] = useState('')
  const [open, setOpen] = useState(true);
  const [userChats, setUserChats] = useState([]);
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  // console.log(Object.entries(userChats));
  useEffect(() => {
    // const fetchData = async () => {
    //       const querySnapshot = await getDocs(collection(db,"userChats"));
    //     const userChats =[]
    //     if(querySnapshot.docs.length > 0) {
    //       querySnapshot.forEach((doc) => {
    //         userChats.push(doc.data())
    //         setUserChats(userChats)
    //     });
    //     }
    // }

  }, [open])
  const handleClick = () => {
    setOpen(!open);
  };
  const selectChannel = (doc) => {
    if (doc) {
      dispatch(enterRoom({
        roomId: doc
      }))
    }
  }
  const handleSearchUser = async () => {
    const q = query(collection(db, "users"),
      where("displayName", "==", searchUsername)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchUser(doc.data())
        setSearchUserUid(doc.id)
      })
    } catch (error) {
      // setErr(true)
    }
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearchUser()
  }
  const handleUserChats = async () => {
    try {
      const res = await setDoc(doc(db, "chats", user.uid + searchUserUid), { messages: [] });
      await setDoc(doc(db, "userChats", searchUserUid), {
        [user.uid + searchUserUid]: {
          date: new Date().toLocaleString(),
          userInfo: {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: searchUserUid
          }
        }
      })
      dispatch(enterRoom({
        roomId: user.uid + searchUserUid
      }))
      setSearchUser(null)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess fontSize='small' style={{ marginRight: 6 }} /> : <ExpandMore fontSize='small' style={{ marginRight: 6 }} />}
        <h3 style={{ fontWeight: 500, fontSize: 14, padding: 0 }}>Inbox</h3>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <SearchUserContainer>
          {/* <input
       placeholder='Search' 
       onChange={(e)=>setSearchUsername(e.target.value)}
       onKeyDown={handleKey}
       /> */}
          <SearchUserInfo>
            {searchUser && <Avatar alt="Remy Sharp" src={searchUser?.photoURL} />}
            {searchUser && <div onClick={handleUserChats} className='test'>
              <h4>{searchUser?.displayName}</h4>
              <p>test</p>
            </div>}

          </SearchUserInfo>
          <SearchUserInfo>

            {/* <>
        <Avatar src={userChat.userInfo.photoURL || null}/>
        <div  className='test'>
       <h4>{userChat[1]?.userInfo.displayName}</h4>
       <p>test</p>
       </div>
        </> */}

          </SearchUserInfo>
        </SearchUserContainer>

      </Collapse>
    </List>

  );
}


const SearchUserContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    font-weight: 300;
    cursor: pointer;
    
    > input {
      padding: 10px;
      border-radius:10px;
      margin-bottom: 10px;
      outline: none;
    }
`
const SearchUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    
    padding-left: 10px;
    :hover {
          opacity; 0.9;
          background-color: #340e36;
      }
     > .test {
     padding-left: 10px;
     }
     > .test > h4 {
      font-weight: 300;
      font-size: 15px;
     }
     > .test > p {
      font-size: 14px;
      color: rgb(146,140,140)
     }
`