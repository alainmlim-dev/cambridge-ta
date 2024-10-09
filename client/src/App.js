import './App.css';
import CDSHeader from './Components/CDSHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import Login from './Components/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <CDSHeader />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
