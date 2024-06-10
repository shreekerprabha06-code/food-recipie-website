import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const history = useNavigate();
  const storedEmail = localStorage.getItem('email')
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
  function removegmail(storedEmail){
    let newEmail = "";
    for (let i = 0; i < storedEmail.length - 10; i++){
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
              <NavLink to="/donate">
                <li className="navlinks">Donate</li>
              </NavLink>
              <NavLink to="/recipies">
                <li className="navlinks">Recipes</li>
              </NavLink>
              <li className="navlinks" id="dropdown2">
               {localStorage.getItem('email')} 
              {/* {localStorage.getItem('newemail')} */}
                <div className="dropdown1">
                  <ul>
                    <NavLink to="/profile">
                      <li>Edit Profile</li>
                    </NavLink>
                    <li onClick={handleLogout}>Log Out</li>
                  </ul>
                </div>
              </li>
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
