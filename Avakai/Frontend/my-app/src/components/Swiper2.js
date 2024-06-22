import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import '../css/Tiffins.css'; 
import { NavLink } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const fetchUrl = 'http://localhost:2000/fetch'; 
const likeUrl = 'http://localhost:2000/update/like'; 
const unlikeUrl = 'http://localhost:2000/update/unlike'; 

function RecipeCard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
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

  return (
    <div className='popularrecipes'>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={-100} 
        slidesPerView={4}
        loop={true}
        pagination={{ clickable: true }}
        style={{ zIndex: "0" }}
      >
        {posts
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(0, 10)
          .map((item, index) => {
            const postUser = users.find(user => user.email === item.email);
            const isLiked = item.likes.includes(userEmail);

            return (
              <SwiperSlide key={index} >
                <div className='card'>
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
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default RecipeCard;
