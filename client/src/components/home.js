import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { NavLink } from "react-router-dom";
// import {location} from './landingPage';
import { useParams } from "react-router";
import { NavBar } from './navbar'


 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

 
const currLocation = ((document.URL).substring((document.URL).lastIndexOf("/")+1)).replace('%20',' ');
console.log(currLocation);

const Restaurant = (props) => (
    <option value={props.location.toString()}>{props.location.toString()}</option>
  );


export default function Homepage() {

    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();
    const params = useParams();


  
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


    return (
        <div>
        {NavBar()}
        <div className="container">
                {/* <img src="client/images/hubgrub-logo.jpg" alt="hubgrub-logo" /> */}
                {/* <h3>{location.value}</h3> */}
                <h1>HUBGRUB @ {currLocation}</h1>
                <br />
                <div className="row" >
                    <div className="col-6">
                    <h2>Current Inventory Stock</h2>
                    </div>
                    <div className="col-6">
                    <h2>Current Menu Items</h2>
                    </div>
                </div>
    
            
        </div>
        </div>
    );
}
