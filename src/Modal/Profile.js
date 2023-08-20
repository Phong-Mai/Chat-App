import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Avatar, Button, FormControl, InputLabel, MenuItem, RadioGroup, Select, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import DateSelect from './DateSelect';
import { updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../features/userSlice';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Auth from '../auth/Auth';

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

export default function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState('men');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const updateUser = useSelector(selectUser)
  const user = Auth()
  const updatePhotoURL = (image) => {
    if (!image) {
      return
    }
    const storageRef = ref(storage, user?.displayName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => alert("error"),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveURLtoFirestore(downloadURL)
        });
      }
    );
    setImage(null)
    handleClose()
  };
  const saveURLtoFirestore = async (downloadURL) => {
    await updateProfile(auth.currentUser, {
      photoURL: downloadURL
    })
    await updateDoc(doc(db, "users", updateUser.uid), {
      photoURL: downloadURL && downloadURL
    });

    const rs = await getDoc(doc(db, "users", updateUser.uid))
    dispatch(login({
      user: rs.data()
    }))
  }
  return (
    <div>
      <div onClick={handleOpen}>Profile</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}  >
            <label htmlFor='avatar'>
              <Avatar sx={{ width: 70, height: 70 }}>H</Avatar>
            </label>
            <input style={{ display: "none" }} onChange={(e) => setImage(e.target.files[0])} id='avatar' type="file" />
            <TextField fullWidth id="standard-basic" label="Obama" variant="standard" />
            <h4 style={{ justifyContent: 'flex-start' }}>User Infomation</h4>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              style={{ flexDirection: 'row', justifyContent: 'center' }}
            >
              <FormControlLabel value="men" control={<Radio />} label="Men" />
              <FormControlLabel value="male" control={<Radio />} label="Women" />
            </RadioGroup>
            <DateSelect />
            <Button onClick={() => updatePhotoURL(image)} color="secondary">Update</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}