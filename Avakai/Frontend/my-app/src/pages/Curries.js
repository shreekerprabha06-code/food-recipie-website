import React from 'react';
import '../css/Tiffins.css'; 
import Recipiecard from '../components/Recipiecard';

function Tiffins() {
  return (
    <div className="container"> 
      <h1>Curries</h1>
      <Recipiecard itemtype= "Curries"/>
    </div>
  );
}

export default Tiffins;