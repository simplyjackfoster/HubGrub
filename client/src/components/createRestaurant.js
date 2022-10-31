import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function CreateRestaurant() {
 const [form, setForm] = useState({
   location: "",
   revenue: 0,
   cost: 0,
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newRestaurant = { ...form };
 
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
 
   setForm({ location: "", revenue: "", cost: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add a new restaurant</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="location">Restaurant Location</label>
         <input
           type="text"
           className="form-control"
           id="location"
           value={form.location}
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
