import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar, Menu, MenuItem } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUser, removeUser, selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import Profile from '../Modal/Profile';
function Header() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const userLocalStorage = JSON.parse(localStorage.getItem('user'))
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const onSignOut = () => {
        if (user) {
            signOut(auth)
        }
        dispatch(removeUser())
    }
    useEffect(() => {
        const user = localStorage.getItem("user")
        !user && navigate('/')
    }, [user])
    return (
        <HeaderContainer >
            <HeaderLeft>
                <HeaderAvatar
                    onClick={(e) => { setAnchorEl(e.currentTarget) }}
                    src={user?.photoURL || userLocalStorage?.photoURL}
                    alt={user?.displayName || userLocalStorage?.displayName}
                ></HeaderAvatar>
                <MenuContainer>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => { setAnchorEl(false) }}
                        PaperProps={{ style: { marginTop: "40px" } }}
                    >
                        <MenuItem onClick={() => { setAnchorEl(false) }} ><Profile /></MenuItem>
                        <MenuItem onClick={() => { }}>My account</MenuItem>
                        <MenuItem onClick={onSignOut}>Logout</MenuItem>
                    </Menu>
                </MenuContainer>
                <AccessTimeIcon />

            </HeaderLeft>

            <HeaderSearch>
                <SearchIcon />
                <input placeholder='Search'></input>
            </HeaderSearch>
            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display:flex;
    flex:0,7;
    position:fixed;
    width:100%;
    height:50px;
    align-items:center;
    justify-content: space-between;
    padding:10px 0;
    background-color: #4a154b !important;
    color:white;
    // z-index: 999;
`
const HeaderLeft = styled.div`
    flex:0.3;
    display:flex;
    align-items: center;
  

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right:20px;
    }
`;
const HeaderAvatar = styled(Avatar)`
    margin-left: 10px;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;
const HeaderSearch = styled.div`
 flex:0.4;
 opacity: 1;
 border-radius: 6px;
 background-color: #421f44;
 text-align:center;
 display: flex;
 padding: 0 50px;
 color: gray;
 border: 1px gray solid;
 @media only screen and (max-device-width: 480px) {
    display: none;
 }

 > input {
    background-color: transparent;
    border: none;
    text-align: center:
    min-width: 30vw;
    outline: 0;
    color: whitell;
 }
`;
const HeaderRight = styled.div`
 flex: 0.3;
 display: flex;
 align-items: flex-end;

 > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
 }
 @media only screen and (max-device-width: 480px) {
    display: none;
 }
`;
const MenuContainer = styled.div`
 > .Muipaper-root {
    top: 0 !important;
 }
`;