/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
const Restaurant = (props) => (
  <option value={props.id.toString()}>{props.location.toString()}</option>
);


export default function FoodOrder() {

    const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch the list of food options from the backend
    fetch('/api/food-options')
      .then(response => response.json())
      .then(data => setFoodOptions(data));
  }, []);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleFoodChange = event => {
    setSelectedFood(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Submit the food order to the backend
    fetch('/api/submit-order', {
      method: 'POST',
      body: JSON.stringify({ name, selectedFood }),
    });
  };

  return (

    <div>
    <div className="row" style={{ margin: 10}}>
    <h1>HubGrub</h1>
    </div>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Food:
        <select value={selectedFood} onChange={handleFoodChange}>
          {foodOptions.map(foodOption => (
            <option key={foodOption.id} value={foodOption.value}>
              {foodOption.label}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Submit Order</button>
    </form>
    </div>
  );
};
                              
