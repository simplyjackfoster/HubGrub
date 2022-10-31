import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
const Restaurant = (props) => (
    <option value={props.location.toString()}>{props.location.toString()}</option>
  );


export default function LandingPage() {

    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();

  
    // This method fetches the records from the database.
    useEffect(() => {
      async function getRestaurants() {
        const response = await fetch(`http://localhost:5000/record/`);
  
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

        console.log("Location: " + location.value);

        // navigate the to home page for the selected restaurant
        navigate("/home/" + location.value);
    }

    return (


        <div className="container">
            <div className="row">
                <h1>HubGrub</h1>
                {/* <img src="client/images/hubgrub-logo.jpg" alt="hubgrub-logo" /> */}
                <h3>Choose the restaurant location</h3>
            </div>
    
    
            <div className="row">    
                <select id="location-dropdown">
                    {restaurantList()}
                </select>
            </div>

            <div className="row">
                <button type="button" className="btn btn-light" onClick={() => navigate("/createRestaurant")}>Add a new restaurant</button>
                
            </div>
            <div className="row">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>

            <div className="row">
                <button type="button" className="col-6 btn btn-light" onClick={() => navigate("/changeIngredients")}>Change ingredient</button>
                <button type="button" className="col-6 btn btn-light" onClick={() => navigate("/menu")}>Change menu</button>
            
            </div>
        
        </div>
    );
}
