import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
 
const Food = (props) => (
  <li>{props.name.toString()}: ${props.price.toString()}</li>
);


export default function ViewFood() {
    // state of parameters
    const [params, setParams] = useState({
        minimumPrice: "",
        maximumPrice: "",
    });

    // state of minimum price
    const [minPrice, setMinPrice] = useState(0.00);

    // state of maximum price
    const [maxPrice, setMaxPrice] = useState(0.00);

    // list of foods state
    const [foods, setFoods] = useState([]);

    // navigation
    // const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
      return setParams((prev) => {
        return { ...prev, ...value };
      });
    }

    

    // useEffect(() => {
    //   async function getFoods() {
    //       const response = await fetch(`http://104.198.248.165:8080/food/`);

    //       if (!response.ok) {
    //           const message = `An error occurred: ${response.statusText}`;
    //           window.alert(message);
    //           return;
    //       }

    //       const foods = await response.json();
    //       setFoods(foods);
    //   }

    //   getFoods();

    //   return;
    // }, [foods.length]);

    // function foodList() {
    //   return foods.map((food) => {
    //       return (
    //           <Food
    //               id={food._id}
    //               name={food.name}
    //               key={food._id}
    //               price={food.price}
    //           />
    //       );
    //   });
    // }


    // This useEffect will filter the list of foods based on the parameters.
    useEffect(() => {
        async function getFoodsByPrice() {
            // set the minimum price and maximum price states to the values from the params or 0 if the value is empty
            setMinPrice(params.minimumPrice === "" ? 0 : params.minimumPrice.trim());
            setMaxPrice(params.maximumPrice === "" ? 0 : params.maximumPrice.trim());

            const response = await fetch(`http://104.198.248.165:8080/food/${minPrice}/${maxPrice}`);
            
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const foods = await response.json();
            setFoods(foods);
        }

        getFoodsByPrice();

        return;
    }, [foods.length, maxPrice, minPrice, params.maximumPrice, params.minimumPrice]);

    // this function will display the list of foods by price
    function foodListByPrice() {
        // display error message if minimum price is greater than maximum price
        if (minPrice > maxPrice) {
            return (
                <div>
                    <h4 style={{color: "red"}}>Error: Minimum price cannot be greater than maximum price</h4>
                </div>
            );
        }

        return foods.map((food) => {
            return (
                <Food
                    id={food._id}
                    name={food.name}
                    price={food.price}
                    key={food._id}
                />
            );
        });
    }


    // This following section will display the food that takes the input from the user.
    return (
        <div>
            <div className="container">
                <h3>Menu</h3>
                <form onSubmit={() => updateForm({ minimumPrice: params.minimumPrice, maximumPrice: params.maximumPrice})}>
                    <div className="form-group">
                        <label htmlFor="minimumPrice">Minimum price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="minimumPrice"
                            value={params.minimumPrice}
                            onChange={(e) => updateForm({ minimumPrice: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maximumPrice">Maximum price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="maximumPrice"
                            value={params.maximumPrice}
                            onChange={(e) => updateForm({ maximumPrice: e.target.value })}
                        />
                    </div>

                    {/* <div className="food-group">
                        <input
                            type="submit"
                            value="Update price range"
                            className="btn btn-primary"
                        />
                    </div> */}
                </form>
            </div>

            <br />
            
            <div className="container">
                <h3>Menu items with price between ${minPrice} and ${maxPrice}</h3>
                <ul>
                    {foodListByPrice()}
                </ul>
            </div>
        </div>
    );  
}
