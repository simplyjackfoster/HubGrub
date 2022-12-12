import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";


const Restaurant = (props) => (
  <li>{props.location.toString()}</li>
);

export default function ViewRestaurant() {
    // state of parameters
    const [params, setParams] = useState({
        minRevenue: 0,
        maxRevenue: 0,
    });

    // list of restaurants state
    const [restaurants, setRestaurants] = useState([]);

    // navigation
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setParams((prev) => {
            return { ...prev, ...value };
        });
    }

    // // This method fetches the restaurants from the database.
    // useEffect(() => {
    //   async function getRestaurants() {
    //     const response = await fetch(`http://localhost:5000/restaurant/`);

    //     if (!response.ok) {
    //       const message = `An error occurred: ${response.statusText}`;
    //       window.alert(message);
    //       return;
    //     }

    //     const restaurants = await response.json();
    //     setRestaurants(restaurants);
    //   }

    //   getRestaurants();

    //   return;
    // }, [restaurants.length]);

    // // This function will display the restaurants.
    // function restaurantList() {
    //   return restaurants.map((restaurant) => {
    //     return (
    //       <Restaurant
    //           id={restaurant._id}
    //           location={restaurant.location}
    //           key={restaurant._id}
    //       />
    //     );
    //   });
    // }



    // this useEffect will filter the restaurants based on the constraints
    useEffect(() => {
        async function getRestaurantsByRevenue() {
            const response = await fetch(`http://localhost:5000/restaurant/${params.minRevenue}/${params.maxRevenue}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const restaurants = await response.json();
            setRestaurants(restaurants);
        }
        
        getRestaurantsByRevenue();

        return;
    }, [params.minRevenue, params.maxRevenue]);


    // This function will display the restaurants by revenue.
    function restaurantListByRevenue() {
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
            <h3>View restaurant locations based on revenue</h3>
            
            <form onSubmit={() => updateForm({ minRevenue: params.minRevenue, maxRevenue: params.maxRevenue })}>
                <div className="form-group">
                    <label htmlFor="minRevenue">Minimum Revenue</label>
                    <input
                        type="text"
                        className="form-control"
                        id="minRevenue"
                        value={params.minRevenue}
                        onChange={(e) => updateForm({ minRevenue: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxRevenue">Maximum Revenue</label>
                    <input
                        type="text"
                        className="form-control"
                        id="maxRevenue"
                        value={params.maxRevenue}
                        onChange={(e) => updateForm({ maxRevenue: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update parameters"
                        className="btn btn-primary"
                    />
                </div>
            </form>

            <h3>Restaurant locations with revenue between ${params.minRevenue} and ${params.maxRevenue}</h3>
            <ul>
                {restaurantListByRevenue()}
            </ul>
        </div>
    );
}   
