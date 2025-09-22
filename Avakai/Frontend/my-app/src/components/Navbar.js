import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = 'https://food-recipie-website-users.onrender.com/fetch';

function Navbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const history = useNavigate();
  const storedEmail = localStorage.getItem('email');
  
  useEffect(() => {
    axios.get(url)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    history('/login');
  };

  let loginButton = null;
  if (!isLoggedIn && currentPath !== '/login' && currentPath !== '/signup') {
    loginButton = (
      <div className="logbtn">
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
      </div>
    );
  }
  
  let logoutButton = null;
  if (isLoggedIn && currentPath === '/profile') {
    logoutButton = (
      <div className="logbtn" style={{ marginLeft: "65px", marginTop: "-20px", paddingBottom: "10px"}}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  
  function removeGmail(storedEmail) {
    let newEmail = "";
    for (let i = 0; i < storedEmail.length - 10; i++) {
      newEmail += storedEmail[i];
    }
    localStorage.setItem('newemail', newEmail);
  }

  return (
    <header>
      <div className="navbar">
        <div className="leftnav">
          <Link to="/" id="logo1">
            <h1>ఆవకాయ.</h1>
          </Link>
        </div>
        {isLoggedIn && (
          <div className={`rightnav ${menuOpen ? 'show' : ''}`}>
            <ul>
              
             
              
              <NavLink to="/recipies">
                <li className="navlinks">Recipes</li>
              </NavLink>
              {logoutButton}
              {posts
                .filter(user => user.email === storedEmail)
                .map((user, index) => (
                  currentPath !== '/profile' && (
                    <li id="dropdown2" key={index}>
                      <p>{user.name}</p>
                      <div className="dropdown1">
                        <ul>
                          <NavLink to="/profile">
                            <li>Edit Profile</li>
                          </NavLink>
                          <li onClick={handleLogout} style={{cursor: "pointer"}}>Log Out</li>
                        </ul>
                      </div>
                      
                    </li>
                  )
                ))}
            </ul>
          </div>
        )}
        {loginButton}
        
        {isLoggedIn && (
          <div className="menubar" onClick={toggleMenu}>
            &#9776;
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
