import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function CreateIngredient() {
 const [form, setForm] = useState({
    name: "",
    price: 0.00,
    calories: 0,
    units: "",
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
 
   await fetch("http://localhost:5000/ingredient/add", {
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
 
   setForm({ name: "", price: 0.00, calories: 0, units: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Ingredients</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">New ingredient name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="units">Enter units of measurement (ex: cups, pounds, units, ounces, etc.)</label>
         <input
           type="text"
           className="form-control"
           id="units"
           value={form.units}
           onChange={(e) => updateForm({ units: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="price">Enter price per unit</label>
         <input
           type="text"
           className="form-control"
           id="price"
           value={form.price}
           onChange={(e) => updateForm({ price: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="calories">Enter calories per unit (approximation)</label>
         <input
           type="text"
           className="form-control"
           id="calories"
           value={form.calories}
           onChange={(e) => updateForm({ calories: e.target.value })}
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
