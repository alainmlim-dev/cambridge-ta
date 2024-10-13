import React, { useState, createContext } from 'react';
import './App.css';
import CDSHeader from './Components/CDSHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Footer from './Components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query'
import ViewArticle from './Components/ViewArticle';
import AddArticle from './Components/AddArticle';

export const AuthContext = createContext();
const queryClient = new QueryClient();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", true)
  };

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    window.location.href = "/"
  };

  const setUser = (u) => setUsername(u)



  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username, setUser }}>
          <BrowserRouter>
            <CDSHeader />
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/articles/*" element={<ViewArticle />}></Route>
              <Route path="/articles/add" element={<AddArticle />}></Route>
              <Route path="/articles/edit" element={<Login />}></Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
