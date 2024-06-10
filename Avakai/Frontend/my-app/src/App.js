import './App.css';
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Home, Recipies, Donate, Profile, Tiffins, Login, Signup, Riceitems, Curries, Snacks } from './pages/index';
import RecipeDetailPage from './components/Recipiepage';

function App() {
  

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipies" element={<Recipies />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/tiffins" element={<Tiffins/>} /> 
          <Route path="/riceitems" element={<Riceitems/>} /> 
          <Route path="/curries" element={<Curries/>} /> 
          <Route path="/snacks" element={<Snacks/>} />
          <Route
          path="/recipe/:title"
          element={<RecipeDetailPage/>}
        /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
