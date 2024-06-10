
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Reciepepage.css'; 

const RecipeDetailPage = () => {
  const { title } = useParams(); 
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/fetchbyname/${title}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [title]);

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="recipe-detail-container">
      <div className="recipe-header">
        <img className="recipe-image" src={data.imglink} alt={data.title} />
        <h1 className="recipe-title">{data.title}</h1>
      </div>
      
      <div className="recipe-section">
        <h2>Process</h2>
        <p>{data.process}</p>
      </div>
      
      <div className="recipe-section">
        <h4>Ingredients</h4>
        <p>{data.ingridients}</p>
      </div>
      
      <div className="recipe-section">
        <h4>Tips</h4>
        <p>{data.tips}</p>
      </div>

      <div className="recipe-meta">
        <p>Item: {data.item}</p>
        <p>Category: {data.category}</p>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
