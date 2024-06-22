import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../css/Tiffins.css'; 

const fetchUrl = 'http://localhost:2000/fetch'; 
const likeUrl = 'http://localhost:2000/update/like'; 
const unlikeUrl = 'http://localhost:2000/update/unlike'; 

function RecipeCard({ itemtype }) {
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

    axios.get('http://localhost:5000/fetch')
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
    post.item === itemtype &&
    (categoryFilter === '' || post.category === categoryFilter)
  );

  return (
    <div>
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
  );
}

export default RecipeCard;
