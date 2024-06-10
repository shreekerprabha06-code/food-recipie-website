import React from 'react';
import '../css/Tiffins.css'; 
import Recipiecard from '../components/Recipiecard';

function Tiffins() {
  return (
    <div className="container"> 
      <h1>  Snacks</h1>
      <Recipiecard itemtype= "Snacks"/>
    </div>
  );
}

export default Tiffins;