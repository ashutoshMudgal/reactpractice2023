import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import React, { useState, useEffect } from 'react';
import ErrorComp from './components/error';
import Dashboard from './components/dashboard';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login open={open} setOpen={setOpen} msg={msg} setMsg={setMsg}/>} exact/>
        <Route path="/signup" element={<Signup open={open} setOpen={setOpen} msg={msg} setMsg={setMsg}/>} exact/>
        <Route path="/dashboard/:id" element={  <Dashboard/>}exact/>
      </Routes>
      <ErrorComp open={open} setOpen={setOpen} msg={msg}/>
    </Router>
  );
}

export default App;
