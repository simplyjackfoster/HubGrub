import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function CreateFood() {
 const [food, setFood] = useState({
   name: "",
   price: "",
 });
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
 
   await fetch("http://localhost:5000/food/add", {
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
 
 // This following section will display the food that takes the input from the user.
 return (
   <div>
     <h3>Add a new recipe to our menu</h3>
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
