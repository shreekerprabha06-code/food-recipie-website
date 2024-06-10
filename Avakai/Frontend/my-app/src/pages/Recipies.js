import React from 'react';
import { NavLink } from 'react-router-dom';
import pic8 from '../Assets/pic8.jpg';
import pic9 from '../Assets/pic9.jpg';
import pic10 from '../Assets/pic10.jpg';
import pic11 from '../Assets/pic11.jpg';
import '../css/Recipies.css';

export function Recipies() {
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
    </div>
  );
}

export default Recipies;
