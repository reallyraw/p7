import React, {useState, useEffect} from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Nav from "./components/Nav"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import {theme} from './constantes/Theme';
import {ThemeProvider} from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isUserLogged, setIsUserLogged] = useState([]);

  useEffect(()=>{
    let userLogged = localStorage.getItem('User');
    if (userLogged) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  }, [isUserLogged])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>   
        <Nav />
        <Routes>
          <Route path="/login" element={isUserLogged ? <Navigate to="/"/> : <Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={!isUserLogged ? <Navigate to="/login"/> : <Home />} />
          <Route path="/post" element={!isUserLogged ? <Navigate to="/login"/> : <Post />} />
          <Route path="/profile" element={!isUserLogged ? <Navigate to="/login"/> : <Profile />} />
          <Route path="/createPost" element={!isUserLogged ? <Navigate to="/login"/> : <CreatePost />} />
          <Route path="/updatePost" element={!isUserLogged ? <Navigate to="/login"/> : <UpdatePost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />   
      </ThemeProvider>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />     
    </div>
  );
}

export default App;
