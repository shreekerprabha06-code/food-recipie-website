import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';

const url = 'http://localhost:5000/register';
const getUsersUrl = 'http://localhost:5000/fetch';

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usersLength, setUsersLength] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsersLength = async () => {
      try {
        const response = await axios.get(getUsersUrl);
        setUsersLength(response.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsersLength();
  }, []);

  const navigate = useNavigate();

  const handleIncrease = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const newUser = { id: usersLength, name, password, email };
    try {
      const response = await axios.post(url, newUser);
      console.log(response.data);
      handleReset();
      navigate('/login');
    } catch (error) {
      console.error('Error registering new user:', error);
      if (error.response && error.response.status === 400) {
        setError('Email already exists');
      } else {
        setError('An error occurred while registering. Please try again later.');
      }
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="reg-container">
      <div className="reg-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleIncrease} onReset={handleReset}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Signup</button>
          <button type="reset">Reset</button>
        </form>
        <p className="signuplink">
          Already have an account? <NavLink to="/login">Login here</NavLink>.
        </p>
      </div>
    </div>
  );
}

export default Signup;
