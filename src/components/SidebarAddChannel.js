import  React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { enterRoom, selectRoomId } from '../features/roomSlice';
import { useEffect } from 'react';
import { Box, Button, colors, Modal } from '@mui/material';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
export default function ListAddChannel() {
  const [open, setOpen] = useState(true);
  const [roomName, setRoomName] = useState([]);
  const dispatch = useDispatch()
  const [ input, setInput] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const roomId = useSelector(selectRoomId)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleClose = (e) =>{
    setOpenAdd(false);
    handleSubmitForm(e)
   }
  const handleSubmitForm =async (e) => {
    e.preventDefault();
     try {
      const res =  await setDoc(doc(db, "rooms",input), {messages:[]});
      dispatch(enterRoom({
        roomId: res.uid
      }))
     } catch (error) {
      console.log(error);
     }
   
  }
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db,"rooms"));
  const roomName =[]
  if(querySnapshot.docs.length > 0) {
    querySnapshot.forEach((doc) => {
      roomName.push(doc.id)
    setRoomName(roomName)
  });
  }
}
  useEffect(() =>{
    fetchData()
},[openAdd])
  const handleClick = () => {
    setOpen(!open);
  };
  const selectChannel = (doc) => {
    if(doc) {
        dispatch(enterRoom({
            roomId: doc
        }))
    }
 }
  return (

        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess fontSize='small' style={{marginRight:6}}/>:<ExpandMore fontSize='small' style={{marginRight:6}}/>}
        <h3 style={{fontWeight:500, fontSize:14,padding:0 }}>Channels</h3>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
      <SidebarListOptionChannel onClick={handleOpenAdd}>
         <AddIcon/>  AddChannel
        </SidebarListOptionChannel>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={(e) =>handleClose(e)}>
            <span>Title</span> 
            <input onChange={(e)=>setInput(e.target.value)} type="text"/>
            {/* <span>Description</span>
            <input type="text"/> */}
            <Button type='submit' variant="contained" color="success">
        Submit
      </Button>
          </Form>
        </Box>
      </Modal>
       <div style={{height:"100%" , backgroundColor:"#4a154b "}}>
       {roomName.map((doc, index) => (
            <SidebarListOptionContainer>
            <ListItemButton key={index} onClick={() =>selectChannel(doc)} sx={{ pl: 4, padding:2, fontSize:15 }}>
              <span> # </span>  {doc}
            </ListItemButton>
            </SidebarListOptionContainer>
        ))}
       </div>
      </Collapse>
    </List>
   
  );
}
const Form = styled.form`
    display:flex;
    flex-direction: column;
    > span {
      margin: 10px 0 10px 0;
    }
    > input {
      padding: 5px;
    }
    > Button {
      width: 100px;
      margin: 10px 0 10px 0;
    }
`
const SidebarListOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
    :hover {
        opacity; 0.9;
        background-color: #340e36;
    }
    > h3 {
        font-weight: 500;
    }
    > h3 > span {
        padding: 15px;
    }
`;
const SidebarListOptionChannel = styled.h3`
    display: flex;
    padding: 10px 0;
    font-weight: 300;
    margin-left: 10px;
    cursor: pointer;
    :hover {
        opacity; 0.9;
        background-color: #340e36;
    }
`