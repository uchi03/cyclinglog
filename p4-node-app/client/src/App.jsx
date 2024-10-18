import {React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { Navbar } from "./Components/Navbar";
import axios from "axios";
import CreateLog from './components/CreateLog';
import ShowLog from "./components/ShowLog";
import EditLog from "./components/EditLog";
import DeleteLog from "./components/DeleteLog";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      axios.get('http://localhost:3001/user', { withCredentials: true })
          .then(response => {
              if (response.data.user) {
                  setIsLoggedIn(true);
              } else {
                  setIsLoggedIn(false);
              }
          })
          .catch(() => setIsLoggedIn(false));
  }, []);

  return (
      <div>
          <BrowserRouter>
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/api/logs" element={<CreateLog />} />
                  <Route path='/api/logs/details/:id' element={<ShowLog />} />
                  <Route path='/api/logs/edit/:id' element={<EditLog />} />
                  <Route path='/api/logs/delete/:id' element={<DeleteLog />} />
                  <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                  <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <SignUp setIsLoggedIn={setIsLoggedIn} />} />
                  
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;