import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function CreateIngredient() {
 const [form, setForm] = useState({
   location: "",
   revenue: "",
   cost: "",
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
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ location: "", revenue: "", cost: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Record Ingredient Purchase</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="location">Enter Ingredient Purchased</label>
         <input
           type="text"
           className="form-control"
           id="location"
           value={form.ingredient}
           onChange={(e) => updateForm({ location: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="location">Enter Quantity</label>
         <input
           type="text"
           className="form-control"
           id="location"
           value={form.ingredient}
           onChange={(e) => updateForm({ location: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Add a new ingredient"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
