import React from 'react';
import '../css/Tiffins.css'; 
import Recipiecard from '../components/Recipiecard';
import Recipefilter from '../components/Recipiefilter';

function Tiffins() {
  return (
    <div className="container"> 
      <h1>Tiffins</h1>
      <Recipiecard itemtype= "Tiffens"/>
      
    </div>
  );
}

export default Tiffins;
