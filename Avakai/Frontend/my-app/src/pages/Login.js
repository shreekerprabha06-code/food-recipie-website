import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

const loginUrl = 'http://localhost:5000/api';

function Login() {
    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = pwdRef.current.value;

        try {
            const response = await axios.post(loginUrl, { email, password, login: true });

            if (response.status === 200) {
                setError('');
                localStorage.setItem('email', email)
                localStorage.setItem('isLoggedIn', 'true');
               navigate('/recipies');
               window.location.reload();
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred while authenticating. Please try again later.');
        }
    };

    return (
        <div className='con'>
            <div className='log'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        ref={emailRef}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        ref={pwdRef}
                    />
                    
                    <br /><p className='signuplink' style={{paddingTop: "10px"}}>For "<NavLink to='/forgotpass'>forgot password</NavLink>"ers</p><br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type='submit'>Login</button>
                </form>
                <p className='signuplink' style={{paddingTop: "10px"}}>If you're a new user <NavLink to='/signup'>signup</NavLink> here</p><br />
            </div>
        </div>
    );
}

export default Login;
