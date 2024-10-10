import React, { useState, createContext } from 'react';
import './App.css';
import CDSHeader from './Components/CDSHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Footer from './Components/Footer';

export const AuthContext = createContext();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false)
    window.location.href = "/"
    localStorage.setItem("token", "")
  };

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <CDSHeader />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
