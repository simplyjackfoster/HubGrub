import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.name,
     position: form.position,
     level: form.level,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Order</h3>
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
           value="Update Order"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
