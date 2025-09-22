import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../css/Profile.css';
import { IoClose } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import Swiper1 from '../components/Swiper1';

const url = 'https://food-recipie-website-users.onrender.com/fetch';
const delurl = 'https://food-recipie-website-users.onrender.com/delete';
const regurl = 'https://food-recipie-website.onrender.com/register';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [title, setTitle] = useState('');
  const [imglink, setImglink] = useState('');
  const [process, setProcess] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [tips, setTips] = useState('');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(delurl, { data: { email } })
      .then(res => {
        console.log(res.data);
        setPosts(posts.filter(user => user.email !== email));
        handleReset();
        logout();
      })
      .catch(err => {
        console.error('Error deleting data:', err);
        setError(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('email');
    axios.put('https://food-recipie-website-users.onrender.com/update', { email: userEmail, name })
      .then(res => {
        console.log(res.data);
        setPosts(posts.map(user => user.email === userEmail ? { ...user, name } : user));
        window.location.reload();
        handleReset();
      })
      .catch(err => {
        console.error('Error updating data:', err);
        setError(err);
      });
  };

  const handleUpdate1 = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const userEmail = localStorage.getItem('email');
    axios.put('https://food-recipie-website-users.onrender.com/update', { email: userEmail, password })
      .then(res => {
        console.log(res.data);
        setPosts(posts.map(user => user.email === userEmail ? { ...user, password } : user));
        window.location.reload();
        handleReset();
      })
      .catch(err => {
        console.error('Error updating data:', err);
        setError(err);
      });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
   
    const ingredientsString = JSON.stringify(ingredients);
    const currentUser = posts.find(user => user.email === userEmail);
    const newRecipe = { title, imglink, process, ingredients: ingredientsString, tips, category, item, email: currentUser.email };
    const response = await axios.post(regurl, newRecipe);
    console.log(response.data);
    console.log(newRecipe);
    handleReset();
  };

  const addIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, currentIngredient]);
      setCurrentIngredient('');
    }
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setTitle('');
    setImglink('');
    setProcess('');
    setIngredients([]);
    setCurrentIngredient('');
    setTips('');
    setCategory('');
    setItem('');
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
  };

  const userEmail = localStorage.getItem('email');

  return (
    <div className='profile'>
      <div className='header'>
        <h1>Hi</h1>
        <div className='profheader'>
          <ul>
            {posts
              .filter(user => user.email === userEmail)
              .map((user, index) => (
                <li key={index}>
                  <h1>
                    {user.name}
                    <span className='pencil' onClick={() => setShow1(!show1)}>
                      <FaPencilAlt />
                    </span>
                  </h1>
                </li>
              ))}
          </ul>
          <div className='profile-btn'>
            <NavLink onClick={() => setShow3(!show3)}><button>Post Recipe</button></NavLink>
            <button onClick={() => setShow2(!show2)}>Update Password</button>
            <button onClick={() => setShow(!show)}>
              {show ? "Close Delete Box" : "Delete Account"}
            </button>
            {show && (
              <div className="modal">
                <div className="deletebox">
                  <span className="close" onClick={() => setShow(false)}><IoClose /></span>
                  <form onSubmit={handleDelete} onReset={handleReset}>
                    <label>Enter your registered email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit">Delete</button>
                    <button type="reset">Reset</button>
                  </form>
                  {error && <p style={{ color: 'red' }}>Error deleting data: {error.message}</p>}
                </div>
              </div>
            )}
            {show1 && (
              <div className="modal">
                <div className="deletebox">
                  <span className="close" onClick={() => setShow1(false)}><IoClose /></span>
                  <form onSubmit={handleUpdate} onReset={handleReset}>
                    <label>Enter your name here</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <button type="submit">Update</button>
                    <button type="reset">Reset</button>
                  </form>
                  {error && <p style={{ color: 'red' }}>Error updating data: {error.message}</p>}
                </div>
              </div>
            )}
            {show2 && (
              <div className="modal">
                <div className="deletebox">
                  <span className="close" onClick={() => setShow2(false)}><IoClose /></span>
                  <form onSubmit={handleUpdate1} onReset={handleReset}>
                    <label>Enter your password here</label>
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
                    <button type="submit">Update</button>
                    <button type="reset">Reset</button>
                  </form>
                  {error && <p style={{ color: 'red' }}>Error updating data: {error.message}</p>}
                </div>
              </div>
            )}
            {show3 && (
              <div className="modal">
                <div className="deletebox" style={{ width: '700px', height: '590px', padding: '0px 40px', marginTop: "80px", paddingTop: "20px", paddingLeft: "40px", paddingRight: "60px" }}>
                  <h1 style={{fontSize: '1.5rem'}}>Add Recipe</h1>
                  <span className="close" onClick={() => setShow3(false)}><IoClose /></span>
                  <form onSubmit={handleRegister} onReset={handleReset}>
                    <label style={{marginTop: "-32px"}}>Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      style={{ marginBottom: '0px', marginTop: '0px'  }}
                    />
                    <label style={{marginTop: "8px"}}>Image Link</label>
                    <input
                      type="text"
                      placeholder="Image Link"
                      value={imglink}
                      onChange={(e) => setImglink(e.target.value)}
                      required
                      style={{ marginBottom: '0px' }}
                    />
                    <label style={{marginTop: "8px"}}>Process</label>
                    <textarea
                      placeholder="Process"
                      value={process}
                      onChange={(e) => setProcess(e.target.value)}
                      required
                      style={{ marginBottom: '0px', padding: "10px" }}
                    />
                    <label style={{marginTop: "7px"}}>Ingredients</label>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
                      <input
                        type="text"
                        placeholder="Add Ingredient"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        style={{ flex: 1, marginRight: '10px',marginTop: '0px'}}
                        />
                        <button type="button" onClick={addIngredient} style={{ flexShrink: 0, marginTop: "-20px" }}>Add</button>
                      </div>
                      <ul style={{ listStyleType: 'none', paddingLeft: '20px', margin: '0px 0', display: "flex"}}>
                        {ingredients.map((ingredient, index) => (
                          <li key={index} style={{backgroundColor: "gray", width: "fit-content", padding: "2px", borderRadius: "5px", marginRight: "2px", marginTop: "-8px", color:"white"}}><p style={{fontSize: "0.9rem", fontWeight: "600"}}>{ingredient}</p></li>
                        ))}
                      </ul>
                      <label style={{marginTop: "0px"}}>Tips</label>
                      <input
                        placeholder="Tips"
                        value={tips}
                        onChange={(e) => setTips(e.target.value)}
                        required
                        style={{ padding: '10px', margin: '0' ,height: '10px' }}
                      />
                      <h3 style={{marginTop: "8px"}}>Category</h3>
                      <div className="radio-group" style={{ marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>
                          <input
                            type="radio"
                            name="category"
                            value="NonVeg Item"
                            checked={category === 'NonVeg Item'}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            style={{marginTop: "8px"}}
                          />
                          NonVeg Item
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="category"
                            value="Veg Item"
                            checked={category === 'Veg Item'}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                          />
                          Veg Item
                        </label>
                      </div>
                      <h3 style={{marginTop: "-10px"}}>Item</h3>
                      <div className="radio-group" style={{ marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>
                          <input
                            type="radio"
                            name="item"
                            value="Tiffens"
                            checked={item === 'Tiffens'}
                            onChange={(e) => setItem(e.target.value)}
                            required
                            style={{marginTop: "8px"}}
                          />
                          Tiffens
                        </label>
                        <label style={{ marginRight: '10px' }}>
                          <input
                            type="radio"
                            name="item"
                            value="Rice Items"
                            checked={item === 'Rice Items'}
                            onChange={(e) => setItem(e.target.value)}
                            required
                          />
                          Rice Items
                        </label>
                        <label style={{marginRight:"10px"}}>
                          <input
                            type="radio"
                            name="item"
                            value="Curries"
                            checked={item === 'Curries'}
                            onChange={(e) => setItem(e.target.value)}
                            required
                          />
                          Curries
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="item"
                            value="Snacks"
                            checked={item === 'Snacks'}
                            onChange={(e) => setItem(e.target.value)}
                            required
                          />
                          Snacks
                        </label>
                      </div>
                      <div style={{ display: "flex",  alignItems: "center", justifyContent: "center", marginTop: "-10px"}}>
                      <button type="submit" style={{ marginRight: '10px' }}>Add Recipe</button><span></span>
                      <button type="reset">Reset</button>
                      </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>Error registering data: {error.message}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='myrecipies'>
          <h1>My Recipies</h1>
        <Swiper1/>
        </div>
        
      </div>
    );
  }
  
  export default Profile;
