import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
 
const Ingredient = (props) => (
  <li>{props.name.toString()}</li>
);

export default function ViewIngredient() {
    // state of parameters
    const [params, setParams] = useState({
        minimumPrice: 0.00,
        maximumPrice: 0.00,
    });

    // list of ingredients state
    const [ingredients, setIngredients] = useState([]);

    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setParams((prev) => {
            return { ...prev, ...value };
        });
    }


    // // This useEffect will fetch the list of ingredients from the database.
    // useEffect(() => {
    //     async function getIngredients() {
    //         const response = await fetch(`http://localhost:5000/ingredient/`);
            
    //         if (!response.ok) {
    //             const message = `An error occurred: ${response.statusText}`;
    //             window.alert(message);
    //             return;
    //         }
          
    //         const ingredients = await response.json();
    //         setIngredients(ingredients);
    //     }

    //     getIngredients();

    //     return;
    // }, [ingredients.length]);

    // function ingredientList() {
    //     return ingredients.map((ingredient) => {
    //         return (
    //             <Ingredient
    //                 id={ingredient._id}
    //                 name={ingredient.name}
    //                 key={ingredient._id}
    //             />
    //         );
    //     }); 
    // }


    // this useEffect will filter the ingredients based on the constraints
    useEffect(() => {
        async function getIngredientsByPrice() {
            const response = await fetch(`http://localhost:5000/ingredient/price/${params.minimumPrice}/${params.maximumPrice}`);
            
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const ingredients = await response.json();
            setIngredients(ingredients);
        }

        getIngredientsByPrice();

        return;
    }, [params.minimumPrice, params.maximumPrice]);

    // This function will display the ingredients by price.
    function ingredientListByPrice() {
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
         <h3>View ingredients based on price per unit</h3>

         <form onSubmit={() => updateForm({ minimumPrice: params.minimumPrice, maximumPrice: params.maximumPrice})}>
           <div className="form-group">
             <label htmlFor="minimumPrice">Minimum price per unit</label>
             <input
               type="text"
               className="form-control"
               id="minimumPrice"
               value={params.minimumPrice}
               onChange={(e) => updateForm({ minimumPrice: e.target.value })}
             />
           </div>
           <div className="form-group">
             <label htmlFor="maximumPrice">Maximum price per unit</label>
             <input
               type="text"
               className="form-control"
               id="maximumPrice"
               value={params.maximumPrice}
               onChange={(e) => updateForm({ maximumPrice: e.target.value })}
             />
           </div>

           <div className="form-group">
             <input
               type="submit"
               value="Update parameters"
               className="btn btn-primary"
             />
           </div>
         </form>

         <h3>Ingredients with price between ${params.minimumPrice} and ${params.maximumPrice} per unit</h3>
         <ul>
           {ingredientListByPrice()}
         </ul>
      </div>
    );
}
