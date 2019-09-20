import React, { useState } from "react";
import axios from 'axios';

const initialUser = {
  username: '',
  password: ''
}

const Login = (props) => {
  const [user, setUser] = useState(initialUser);

  const handleUserChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleUserSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, user)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
      })
      .catch(err => console.log('Error: Login.js: Post: ', err));
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleUserSubmit}>
        <input name='username' placeholder='Username' value={user.username} onChange={handleUserChange} />
        <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleUserChange} />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
