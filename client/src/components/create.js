import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
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
 
   setForm({ name: "", position: "", level: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Make an Order</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Restaurant Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Food</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="spiceOptions"
             id="noSpice"
             value="No Spice"
             checked={form.level === "No Spice"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="noSpice" className="form-check-label">No Spice</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="spiceOptions"
             id="mediumSpice"
             value="Medium Spice"
             checked={form.level === "Medium Spice"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="mediumSpice" className="form-check-label">Medium Spice</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="spiceOptions"
             id="verySpicy"
             value="Very Spicy"
             checked={form.level === "Very Spicy"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="verySpicy" className="form-check-label">Very Spicy</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Submit Order"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
