import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
const Restaurant = (props) => (
  <option value={props.id.toString()}>{props.location.toString()}</option>
);


export default function LandingPage() {

    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();

  
    // This method fetches the restaurants from the database.
    useEffect(() => {
      async function getRestaurants() {
        const response = await fetch(`http://localhost:8080/restaurant/`);
  
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const restaurants = await response.json();
        setRestaurants(restaurants);
      }
  
      getRestaurants();
  
      return;
    }, [restaurants.length]);

    function restaurantList() {
      return restaurants.map((restaurant) => {
        return (
          <Restaurant
              id={restaurant._id}
              location={restaurant.location}
              key={restaurant._id}
          />
        );
      });
    }


    // function to handle the on click event of the button
    const handleSubmit = () => {
        console.log("Button clicked");

        const location = document.getElementById("location-dropdown");

        // navigate the to home page for the selected restaurant
        navigate("/home/" + location.value);

    }

    return (
        <div className="container">
            <div className="row" style={{ margin: 10}}>
                <h1>HubGrub</h1>
                <h3>Choose the restaurant location</h3>
            </div>
    
            <div className="row" style={{ margin: 10}}>    
                <select id="location-dropdown">
                    {restaurantList()}
                </select>
            </div>

            <div className="row" style={{ margin: 10}}>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Go to home page</button>
            </div>

            <div className="row" style={{ margin: 10}}>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/createRestaurant")}>Add a new restaurant location</button>
            </div>

            <div className="row" style={{ margin: 10}}>
                <button type="button" className="col-6 btn btn-outline-secondary" onClick={() => navigate("/createIngredient")}>Add ingredient</button>
                <button type="button" className="col-6 btn btn-outline-secondary" onClick={() => navigate("/createFood")}>Add menu item</button>
            </div>

            <div className="row" style={{ margin: 10}}>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/viewRestaurant")}>View restaurant locations</button>
            </div>

            <div className="row" style={{ margin: 10}}>
                <button type="button" className="col-6 btn btn-secondary" onClick={() => navigate("/viewIngredient")}>View ingredients</button>
                <button type="button" className="col-6 btn btn-secondary" onClick={() => navigate("/viewFood")}>View menu items</button>
            </div>
        </div>
    );
}
