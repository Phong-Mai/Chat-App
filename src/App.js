import { initializeApp } from 'firebase/app';
import React from 'react';


import './App.css';
import Home from './pages/Home';

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDYR-hv3dJfUozNgzgRGWCFLAWJLi30nI4",
    authDomain: "chat-app-cba1a.firebaseapp.com",
    projectId: "chat-app-cba1a",
    storageBucket: "chat-app-cba1a.appspot.com",
    messagingSenderId: "69994836678",
    appId: "1:69994836678:web:d0d9b050606a53a0229dc7",
    measurementId: "G-ES1DYYVJD4"
  };

  const app = initializeApp(firebaseConfig);
  
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
