import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoading, setLoading } from '../features/userSlice';
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
function Login() {
    const [signInManual, setSignInManual] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const loading = useSelector(selectLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const signIn = async (e, type) => {
        const provider = new GoogleAuthProvider()
        e.preventDefault();
        switch (type) {
            case "google":
                try {
                    const res = await signInWithPopup(auth, provider)
                    dispatch(login({
                        user: res.user
                    }))
                    navigate('/home')
                } catch (error) {
                    alert("User not found");
                    dispatch(setLoading({
                        loading: false
                    }))
                }
            default:
                break;
        }
    };

    const toggleSignInManual = () => {
        setSignInManual(!signInManual);
        setSignUp(false);
    }
    const toggleSignUp = () => {
        setSignUp(true);
    }
    const onSubmitSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, username, password, displayName);
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                password,
                displayName,
                photoURL: ''
            });
            await updateProfile(auth.currentUser, {
                displayName,
            })
            dispatch(setLoading({
                loading: false,
            }))
            alert("Sign up successful")
            setSignUp(false)
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmitSignIn = async () => {
        dispatch(setLoading({
            loading: true
        }));
        try {
            const res = await signInWithEmailAndPassword(auth, username, password);
            dispatch(login({
                user: res.user
            }))
            navigate('/home')
        } catch (error) {
            alert("User not found");
            dispatch(setLoading({
                loading: false
            }))
        }
    }

    return (

        <LoginContainer>
            <LoginInnerContainer>
                <img src='https://cdn.cdnlogo.com/logos/s/40/slack-new.svg' alt='logo-slack' />
                <h1>Sign in to slack</h1>
                <p>slack.com</p>
                {!signInManual ? (
                    <>
                        <ManualBtn>
                            <Button onClick={toggleSignInManual}>Sign in manually</Button>
                        </ManualBtn> {" "}
                        <GoogleBtn>
                            <Button onClick={(e) => { signIn(e, "google") }}>
                                {" "}
                                <img width='20px' src='https://tse1.mm.bing.net/th?id=OIP.bQFWLjAk0JQta4ZayBBRwAHaHa&pid=Api&P=0&w=300&h=300'/>
                                Sign in with Google
                            </Button>
                        </GoogleBtn>
                    </>
                ) :
                    !signUp ? (
                        <>
                            <Form>
                                {" "}
                                <h3>Sign in</h3>
                                <input
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                />
                                <input
                                    placeholder='Password'
                                    type='password'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <Button onClick={onSubmitSignIn}>
                                    {loading ? <Spinner color="purple" fadeIn="none" /> : "Sign In"}
                                </Button>
                                <span onClick={toggleSignInManual}>Back</span>
                                <span onClick={toggleSignUp}>Sign up</span>
                            </Form>
                        </>
                    ) : (
                        <>
                            <Form>
                                {" "}
                                <h3>Sign up</h3>
                                <input
                                    placeholder='Email'
                                    onChange={(e) => { setUsername(e.target.value) }}
                                />
                                <input
                                    placeholder='DisplayName'
                                    onChange={(e) => { setDisplayName(e.target.value) }}
                                />
                                <input
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <Button onClick={onSubmitSignUp}>
                                    {loading ? (
                                        <SpinnderContainer>
                                            <Spinner />
                                        </SpinnderContainer>
                                    ) : (
                                        "Sign up"
                                    )}
                                </Button>
                                <span onClick={toggleSignInManual}>Sign in</span>
                            </Form>
                        </>
                    )
                }


            </LoginInnerContainer>
        </LoginContainer>

    );
}

export default Login

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;
const LoginInnerContainer = styled.div`
   
    padding:100px;
    background-color: white;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }
`;
const ManualBtn = styled.div`
    margin-top: 20px;
    border-radius: 5px;
    background-color: #4a154b !important;
    > button {
        color: white;
    }
`;

const GoogleBtn = styled.div`
    margin-top: 20px;
    border-radius: 5px;
    border: 2px solid #4285f4;
    > button {
        color: #4285f4
    }
`;
const Logo = styled.div`
    margin-right: 12px;
    width: 18px;
    height: 18px;
`;
const Form = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    > h3 {
        margin-bottom: 20px;
    }
    > input {
        padding: 0 20px;
        height: 40px;
        width: 100%;
        border: 1px solid #e01e5a;
        border-radius: 4px;
        transition: border 80ms ease-out, box-shadow 80ms ease-out;
        box-sizing: border-box;
        margin: 0 0 20px;
    }
    > button {
        color: white;
        background-color: #4a154b;
        border: 1px solid #e01e5a;
        margin: 0 auto;
    }
    > button:hover {
        background-color: #4a154b;
    }
    > span {
        cursor: pointer;
        margin-top: 10px;
        color: #1264a3;
    }
`;
const SpinnderContainer = styled.span`
    > .sk-spinner {
        color: white !important;
    }
`;
const Spinner = styled.div``;