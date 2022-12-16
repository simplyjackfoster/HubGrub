import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
 
const Ingredient = (props) => (
  <li>{props.name.toString()}</li>
);

export default function CreateIngredient() {
  // new ingredient state
  const [form, setForm] = useState({
     name: "",
     price: "",
     calories: "",
     units: "",
  });
  // list of ingredients state
  const [ingredients, setIngredients] = useState([]);

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
    const newIngredient = { ...form };
  
    await fetch("http://127.0.0.1/8:8080/ingredient/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIngredient),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    console.log(JSON.stringify(newIngredient));
   
    setForm({ name: "", price: 0.00, calories: 0, units: ""});
    navigate("/");
  }

  useEffect(() => {
    async function getIngredients() {
      const response = await fetch(`http://127.0.0.1/8:8080/ingredient/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
      const ingredients = await response.json();
      setIngredients(ingredients);
    }

    getIngredients();

    return;
  }, [ingredients.length]);

 function ingredientList() {
  return ingredients.map((ingredient) => {
      return (
          <Ingredient
              id={ingredient._id}
              name={ingredient.name}
              key={ingredient._id}
          />
      );
  });
}
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
      <h3>Ingredients</h3>
      <ul>
        {ingredientList()}
      </ul>
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
