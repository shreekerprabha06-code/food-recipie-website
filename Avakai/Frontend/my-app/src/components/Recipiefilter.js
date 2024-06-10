
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipiecard from './Recipiecard';

const Recipefilter = ({ itemtype }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/fetch');
        const filteredData = response.data.filter(item => item.itemtype === itemtype);
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [itemtype]);

  return (
    <div>
      <h1>{itemtype} Recipes</h1>
      <Recipiecard data={data} />
    </div>
  );
};

export default Recipefilter;
