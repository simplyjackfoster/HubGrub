import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";


const Restaurant = (props) => (
  <li>{props.location.toString()} : ${props.revenue.toString()}</li>
);

export default function ViewRestaurant() {
    // state of parameters
    const [params, setParams] = useState({
        minimumRevenue: "",
        maximumRevenue: "",
    });

    // state of minimum revenue
    const [minRevenue, setMinRevenue] = useState(0);

    // state of maximum revenue
    const [maxRevenue, setMaxRevenue] = useState(0);

    // list of restaurants state
    const [restaurants, setRestaurants] = useState([]);

    // navigation
    // const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setParams((prev) => {
            return { ...prev, ...value };
        });
    }

    // // This method fetches the restaurants from the database.
    // useEffect(() => {
    //   async function getRestaurants() {
    //     const response = await fetch(`http://104.154.34.49:8080/restaurant/`);

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
            // set the minimum price and maximum price states to the values from the params or 0 if "".
            setMinRevenue(params.minimumRevenue === "" ? 0 : params.minimumRevenue.trim());
            setMaxRevenue(params.maximumRevenue === "" ? 0 : params.maximumRevenue.trim());

            const response = await fetch(`http://104.154.34.49:8080/restaurant/${minRevenue}/${maxRevenue}`);

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
    }, [params.minimumRevenue, params.maximumRevenue, minRevenue, maxRevenue]);


    // This function will display the restaurants by revenue.
    function restaurantListByRevenue() {
        // display error message if minRevenue is greater than maxRevenue
        if (minRevenue > maxRevenue) {
            return (
                <div>
                    <h4 style={{color: "red"}}>Error: Minimum revenue cannot be greater than maximum revenue</h4>
                </div>
            );
        }

        return restaurants.map((restaurant) => {
            return (
                <Restaurant
                    id={restaurant._id}
                    location={restaurant.location}
                    revenue={restaurant.revenue}
                    key={restaurant._id}
                />
            );
        });
    }
    
    
    
    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <div className="container">
                <h3>View restaurant locations based on revenue</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="minimumRevenue">Minimum Revenue</label>
                        <input
                            type="text"
                            className="form-control"
                            id="minimumRevenue"
                            value={params.minimumRevenue}
                            onChange={(e) => updateForm({ minimumRevenue: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="maximumRevenue">Maximum Revenue</label>
                        <input
                            type="text"
                            className="form-control"
                            id="maximumRevenue"
                            value={params.maximumRevenue}
                            onChange={(e) => updateForm({ maximumRevenue: e.target.value })}
                        />
                    </div>

                    {/* <div className="form-group">
                        <input
                            type="submit"
                            value="Update parameters"
                            className="btn btn-primary"
                        />
                    </div> */}
                </form>
            </div>

            <br />

            <div className="container">
                <h3>Restaurant locations with revenue between ${minRevenue} and ${maxRevenue}</h3>
                <ul>
                    {restaurantListByRevenue()}
                </ul>
            </div>
        </div>
    );
}   
