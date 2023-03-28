import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link, useNavigate
} from "react-router-dom";
import { decodeToken } from "react-jwt";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default (props) => {
  let [userData, setuserData] = useState({ email: '', password: '' });
  let [emailError, setEmailError] = useState(false);
  let [emailErrorMsg, setEmailErrorMsg] = useState('');
  let [pwError, setpwError] = useState(false);
  let [pwErrorMsg, setpwErrorMsg] = useState('');
  const navigate = useNavigate();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmailChange = event => {
    userData.email = event.target.value
    setuserData(userData)
    if (!event.target.value) {
      setEmailError(true)
      setEmailErrorMsg('Email can not be empty');
    } else {
      if (!isValidEmail(event.target.value)) {
        setEmailError(true)
        setEmailErrorMsg('Email is invalid');
      } else {
        setEmailError(false)
        setEmailErrorMsg('');
      }
    }
  };

  const handlePwChange = event => {
    userData.password = event.target.value
    setuserData(userData)
    if (!event.target.value) {
      setpwError(true)
      setpwErrorMsg('Password can not be empty');
    } else {
      setpwError(false)
      setpwErrorMsg('');
    }
  };
  const loginApi = () => {
    if (!userData.email) {
      setEmailError(true)
      setEmailErrorMsg('Email can not be empty');
    }else if(!userData.password) {
      setpwError(true)
      setpwErrorMsg('Password can not be empty');
    }else{
      axios({
        url: `http://localhost:3006/users/login`,
        method: 'POST',
        data: userData
      }).then(results => {
        const decodedData = decodeToken(results.data.token);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('id', decodedData.id);
        navigate(`./dashboard/${decodedData.id}`, { state: decodedData })
      }).catch(err => {
        props.setOpen(true)
        props.setMsg(err.response.data.message)
      })
    }
  }



  return <div className='Login'>
    <h1>Login</h1>
    <TextField
      onChange={(e) => {handleEmailChange(event)}}
      error={emailError}
      helperText={emailErrorMsg}
      sx={{
        "& .MuiInputBase-root": {
          height: 40,
          width: 220
        }
      }}
    />
    <br></br>
    <br></br>

    <TextField
      onChange={(e) => {handlePwChange(e)}}
      error={pwError}
      helperText={pwErrorMsg}
      sx={{
        "& .MuiInputBase-root": {
          height: 40,
          width: 220
        }
      }}
    />
    <br></br>
    <br></br>
    <Button variant="contained" id='signupbutton' type="button" onClick={loginApi}> submit </Button>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    new user? click here to register
    <Link to='/signup'>
      <button>signup</button>
    </Link>
  </div>
}