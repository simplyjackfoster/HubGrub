import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
 
const Food = (props) => (
  <li>{props.name.toString()}: ${props.price.toString()}</li>
);


export default function CreateFood() {
  // new food state
  const [food, setFood] = useState({
    name: "",
    price: "",
  });
  // list of foods state
  const [foods, setFoods] = useState([]);

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateFood(value) {
    return setFood((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newFood = { ...food };
  
    await fetch("http://localhost:8080/food/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

     console.log(JSON.stringify(newFood));
   
    setFood({ name: "", price: 0.00});
    navigate("/");
  }

  useEffect(() => {
    async function getFoods() {
        const response = await fetch(`http://localhost:8080/food/`);

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

  // This following section will display the food that takes the input from the user.
  return (
    <div>
      <h3>Menu</h3>
      <ul>
         {foodList()}
      </ul>
      <form onSubmit={onSubmit}>
         <div className="form-group">
             <label htmlFor="name">New recipe name</label>
             <input
               type="text"
               className="form-control"
               id="name"
               value={food.name}
               onChange={(e) => updateFood({ name: e.target.value })}
             />
         </div>
         <div className="form-group">
             <label htmlFor="price">Recipe price</label>
             <input
               type="text"
               className="form-control"
               id="price"
               value={food.price}
               onChange={(e) => updateFood({ price: e.target.value })}
             />
         </div>



        <div className="food-group">
          <input
            type="submit"
            value="Add a new recipe"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
