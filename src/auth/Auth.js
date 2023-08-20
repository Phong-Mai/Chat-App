import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config'

function Auth() {
  const [dataUser, setDataUser] = useState()
  useEffect(() =>{
  const unsub=  onAuthStateChanged(auth, (user) =>{
      setDataUser(user)
    })
    return () => {
      unsub()
    }
  },[dataUser])
  return dataUser
}

export default Auth
