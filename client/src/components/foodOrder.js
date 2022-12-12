/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
 const Food = (props) => (
  <option>{props.name.toString()} ${props.price.toString()}</option>
);


export default function FoodOrder() {

    const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    async function getFoods() {
      const response = await fetch(`http://localhost:5000/food/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const foods = await response.json();
      setFoodOptions(foods);
    }

    getFoods();

    return;
  }, [foodOptions.length]);

  function foodList() {
    return foodOptions.map((food) => {
      return (
        <Food
            name={food.name}
            price={food.price}
        />
      );
    });
  }
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

  console.log(foodOptions);

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
        <div className="row" style={{ margin: 10}}>    
                <select id="location-dropdown">
                    {foodList()}
                </select>
            </div>
      </label>
      <button type="submit">Submit Order</button>
    </form>
    </div>
  );
};
                              
