import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function PurchaseIngredient() {
 const [form, setForm] = useState({
    name: "",
    quantity: 0
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
 
   setForm({ name: "", quantity: 0});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Record Ingredient Purchase</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Enter Ingredient Purchased</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="quantity">Enter Quantity</label>
         <input
           type="text"
           className="form-control"
           id="quantity"
           value={form.quantity}
           onChange={(e) => updateForm({ quantity: e.target.value })}
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
