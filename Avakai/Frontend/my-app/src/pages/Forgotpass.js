import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios.put('https://food-recipie-website-users.onrender.com/update', { email, password })
      .then(res => {
        console.log(res.data);
        navigate('/');
        window.location.reload();
        handleReset();
      })
      .catch(err => {
        console.error('Error updating data:', err);
        setError('Failed to update password. Please try again.');
      });
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null); 
  }

  return (
    <div className='con'>
      <div className='log'>
        <h1>Reset Password</h1>
        <form onSubmit={handleUpdate}>
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
          <br /><br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type='submit'>Update Password</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPass;
