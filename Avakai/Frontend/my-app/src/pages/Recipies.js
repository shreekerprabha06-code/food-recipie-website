import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import pic8 from '../Assets/pic8.jpg';
import pic9 from '../Assets/pic9.jpg';
import pic10 from '../Assets/pic10.jpg';
import pic11 from '../Assets/pic11.jpeg';
import '../css/Recipies.css';
import Swiper2 from '../components/Swiper2';

import { FaStar } from 'react-icons/fa';
import axios from 'axios';
const fetchUrl = 'https://food-recipie-website.onrender.com/fetch'; 
const likeUrl = 'https://food-recipie-website.onrender.com/update/like'; 
const unlikeUrl = 'https://food-recipie-website.onrender.com/update/unlike';

export function Recipies() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const userEmail = localStorage.getItem('email');
  useEffect(() => {
    axios.get(fetchUrl)
      .then(res => {
        console.log('Posts fetched:', res.data); 
        setPosts(res.data);
        const emails = res.data.map(post => post.email).filter(email => email !== undefined);
        setEmails(emails);
        console.log('Emails extracted:', emails); 
      })
      .catch(err => console.log('Error fetching posts:', err)); 

    axios.get('https://food-recipie-website-users.onrender.com/fetch')
      .then(res => {
        console.log('Users fetched:', res.data); 
        setUsers(res.data);
      })
      .catch(err => console.log('Error fetching users:', err)); 
  }, []);
  const handleLikeToggle = (title) => {
    const post = posts.find(post => post.title === title);

    if (!post) {
      console.log(`Recipe with title ${title} not found.`);
      return;
    }

    const isLiked = post.likes.includes(userEmail);

    if (isLiked) {
      axios.put(unlikeUrl, { title, userEmail })
        .then(res => {
          console.log('Recipe unliked:', res.data);
          updatePosts(title, res.data.likes);
        })
        .catch(err => console.log('Error unliking recipe:', err));
    } else {
      axios.put(likeUrl, { title, userEmail })
        .then(res => {
          console.log('Recipe liked:', res.data);
          updatePosts(title, res.data.likes);
        })
        .catch(err => console.log('Error liking recipe:', err));
    }
  };

  const updatePosts = (title, updatedLikes) => {
    const updatedPosts = posts.map(post => {
      if (post.title === title) {
        return { ...post, likes: updatedLikes };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(prevCategory => prevCategory === category ? '' : category);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) && 
   
    (categoryFilter === '' || post.category === categoryFilter)
  );
  return (
    <div className='recipes'>
      <h1>Recipes</h1>
      <div className='cat1'>
        <div className='tiffins'>
          <NavLink to='/tiffins'><img src={pic10} alt='Tiffins'/></NavLink>
          <h1>Tiffins</h1>
        </div>
        <div className='curries'>
          <NavLink to='/curries'><img src={pic8} alt='Curries'/></NavLink>
          <h1>Curries</h1>
        </div>
        <div className='rice'>
          <NavLink to='/riceitems'><img src={pic9} alt='Rice Items'/></NavLink>
          <h1>Rice Items</h1>
        </div>
        <div className='snacks'>
          <NavLink to='/snacks'><img src={pic11} alt='Snacks'/></NavLink>
          <h1>Snacks</h1>
        </div>
      </div>
      <h1 style={{textAlign: "left", marginLeft: "30px", paddingBottom: "0px", marginBottom: "-20px"}}>Star Items</h1>
      <div style={{position: "relative", zIndex: "100", padding: "0px 40px", marginBottom: "10px"}}><Swiper2/></div>
      <div style={{paddingBottom: "50px"}}>
        <h1 style={{marginTop: "50px", paddingBottom: "0px", marginBottom: "-15px"}}>Menu</h1>
      <div style={{ display: 'flex', justifyContent: "center", marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by title" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ padding: '10px', width: '50%', borderRadius: "10px" }}
        />
        <button 
          onClick={() => handleCategoryFilter('Veg Item')} 
          style={{ 
            padding: '10px', 
            backgroundColor: categoryFilter === 'Veg Item' ? 'lightgreen' : 'darkgreen', 
            border: '1px solid green',
            cursor: 'pointer',
            borderRadius: '15px',
            color: 'white',
            marginLeft: "20px"
          }}
        >
          Veg
        </button>
        <button 
          onClick={() => handleCategoryFilter('NonVeg Item')} 
          style={{ 
            padding: '10px', 
            backgroundColor: categoryFilter === 'NonVeg Item' ? 'lightcoral' : 'Darkred', 
            border: '1px solid red',
            cursor: 'pointer',
            borderRadius: '15px',
            color: 'white',
            marginLeft: "5px"
          }}
        >
          Non-Veg
        </button>
      </div>
      <div className="card-container">
        {filteredPosts.length === 0 ? (
          <p>No recipes available.</p>
        ) : (
          filteredPosts.map((item, index) => {
            const postUser = users.find(user => user.email === item.email);
            const isLiked = item.likes.includes(userEmail);

            return (
              <div className='card' key={index}>
                <div className='card-img'>
                  <img src={item.imglink} alt={item.title} />
                </div>
                <div className='card-content'>
                  <h2><NavLink to={`/recipe/${item.title}`}>{item.title}</NavLink></h2>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "5px" }}>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontSize: "0.8rem" }}>posted by:</p>
                      <p style={{ fontSize: "1rem" }}>{postUser ? postUser.name : 'User not found'}</p>
                    </div>
                    <div className="card-icons">
                      <span style={{ paddingTop: "5px", paddingRight: "5px", fontSize: "0.8rem" }}>{item.likes.length}</span>
                      <FaStar
                        className="icon"
                        style={{ cursor: 'pointer', color: isLiked ? '#FFD700' : '#CCCCCC' }}
                        onClick={() => handleLikeToggle(item.title)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      </div>
    </div>
    
    
  );
}

export default Recipies;
