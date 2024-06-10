import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaSave } from 'react-icons/fa';
import '../css/Tiffins.css'; 
import { NavLink } from 'react-router-dom';
const url = 'http://localhost:2000/fetch';

function Recipiecard({itemtype}) {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    axios.get(url)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
  <div className="card-container">
        {posts
          .filter(item => item.item === itemtype)
          .map((item, index) => (
            <div className='card' key={index}>
              <div className='card-img'>
                <img src={item.imglink} alt={item.title} />
              </div>
              <div className='card-content'>
                <h2><NavLink to={`/recipe/${item.title}`}>{item.title}</NavLink></h2>
                <div className="card-icons">
                  <FaStar className="icon" /> 
                  <FaSave className="icon" /> 
                </div>
              </div>
            </div>
          ))}
      </div>
    
  );
}

export default Recipiecard;
