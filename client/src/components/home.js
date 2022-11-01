import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
// import {location} from './landingPage';
import { useParams } from "react-router";
import { NavBar } from './navbar'


 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

 


// const Restaurant = (props) => (
//     <option value={props.location.toString()}>{props.location.toString()}</option>
//   );

const Ingredient = (props) => (
    <li>{props.name.toString()}</li>
);

const Food = (props) => (
    <li>{props.name.toString()} : ${props.price.toString()}</li>
);



export default function Homepage() {

    // const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();
    const params = useParams();
    const [ingredients, setIngredients] = useState([]);
    const [foods, setFoods] = useState([]);
    const [restaurant, setRestaurant] = useState();


    const currLocation = ((document.URL).substring((document.URL).lastIndexOf("/")+1)).replace('%20',' ');
    console.log(currLocation);

    // useEffect(() => {
    //     async function getRestaurant() {
    //       const response = await fetch(`http://localhost:5000/restaurant/`+ currID);
    
    //       if (!response.ok) {
    //         const message = `An error occurred: ${response.statusText}`;
    //         window.alert(message);
    //         return;
    //       }
    
    //       const restaurant = await response.json();
    //       setRestaurant(restaurant);
    //     }
    
    //     getRestaurant();

    //     console.log(restaurant);
    
    //     return;
    //   },);

  
    useEffect(() => {
        async function getFoods() {
          const response = await fetch(`http://localhost:5000/food/`);
    
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const foods = await response.json();
          setFoods(foods);
        }
    
        getFoods();
    
        return;
      }, [foods.length]);

    useEffect(() => {
        async function getIngredients() {
          const response = await fetch(`http://localhost:5000/ingredient/`);
    
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const ingredients = await response.json();
          setIngredients(ingredients);
        }
    
        getIngredients();
    
        return;
      }, [ingredients.length]);

      function ingredientList() {
        return ingredients.map((ingredient) => {
          return (
            <Ingredient
              id={ingredient._id}
              name={ingredient.name}
              key={ingredient._id}
              />
          );
        });
      }

      function foodList() {
        return foods.map((food) => {
          return (
            <Food
              id={food._id}
              name={food.name}
              key={food._id}
              price={food.price}
              />
          );
        });
      }
    return (
        <div>
        {NavBar()}
        <div className="container">
                <div className="row" >
                <div className="col-6">
                    <h1>HUBGRUB @ {currLocation}</h1>
                </div>
                <div className="col-6">
                <button className="btn btn-danger" style={{marginTop: "20px"}}>Close this Location</button>
                </div>
                </div>
                <br />
                <div className="row" >
                    <div className="col-6">
                    <h2>Current Inventory Stock</h2>
                    <ul>
                        {ingredientList()}
                    </ul>
                    </div>
                    <div className="col-6">
                    <h2>Current Menu Items</h2>
                    <ul>
                        {foodList()}
                    </ul>
                    </div>
                </div>
    
            
        </div>
        </div>
    );
}
