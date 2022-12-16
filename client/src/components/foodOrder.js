/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
import logo from './HUBGRUB.png';

 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
 const Food = (props) => (
  <option>{props.name.toString()} </option>
);


export default function FoodOrder() {
    const navigate = useNavigate();


    const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [name, setName] = useState('');
  const [order, setOrder] = useState({
    name: "",
    food: "",
    
  });


  function updateForm(value) {
    return setOrder((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    async function getFoods() {
      const response = await fetch(`http://104.198.248.165:8080/food/`);

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

  async function addOrder(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newOrder = { ...order };
  
    await fetch("http://104.198.248.165:8080/order/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    console.log(JSON.stringify(newOrder));
   
    setOrder({ name: "", food: "" });
    navigate("/");
  }
  console.log(foodOptions);

  return (

    <div>
       <a href="/"><img className="imglogo" style={{ textAlign: "left", width: "", height: "" }} src={logo} alt="Logo2" /></a>
<br /> <br /> <br /> <br /> <br /> 
    <form onSubmit={addOrder}>
      <label>
        Name:
        <input
            type="text"
            className="form-control"
            id="name"
            value={order.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
      </label>
      <label>
        Food:
        <div className="row" style={{ margin: 10}}>    
                <select id="location-dropdown" 
                value={order.food}
                onChange={(e) => updateForm({ food: e.target.value })}>
                    {foodList()}
                </select>
            </div>
      </label>
      <button type="submit">Submit Order</button>
    </form>
    </div>
  );
};
                              
