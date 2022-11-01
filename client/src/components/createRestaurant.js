import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";


const Restaurant = (props) => (
  <li>{props.location.toString()}</li>
);

export default function CreateRestaurant() {
  // new restaurant state
  const [restaurant, setRestaurant] = useState({
    location: "",
    revenue: 0,
    cost: 0,
  });
  // list of restaurants state
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setRestaurant((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newRestaurant = { ...restaurant };
  
    await fetch("http://localhost:5000/restaurant/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRestaurant),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    console.log(JSON.stringify(newRestaurant));
   
    setRestaurant({ location: "", revenue: "", cost: "" });
    navigate("/");
  }

  // This method fetches the restaurants from the database.
  useEffect(() => {
    async function getRestaurants() {
      const response = await fetch(`http://localhost:5000/restaurant/`);

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

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Restaurant locations</h3>
      <ul>
       {restaurantList()}
      </ul>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="location">New restaurant location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={restaurant.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Add a new restaurant"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
