import React from 'react';
import '../css/Tiffins.css'; 
import Recipiecard from '../components/Recipiecard';

function Tiffins() {
  return (
    <div className="container"> 
      <h1>Rice Items</h1>
      <Recipiecard itemtype= "Rice Items"/>
    </div>
  );
}

export default Tiffins;
