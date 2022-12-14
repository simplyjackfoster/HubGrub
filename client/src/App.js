import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
// import Navbar from "./components/navbar";
// import RecordList from "./components/recordList";
import Edit from "./components/edit";
import CreateRestaurant from "./components/createRestaurant";
import CreateIngredient from "./components/createIngredient";
import LandingPage from "./components/landingPage";
import Homepage from "./components/home";
import PurchaseIngredient from "./components/purchaseIngredient";
import CreateFood from "./components/createFood";
import ViewRestaurant from "./components/viewRestaurant";
import ViewIngredient from "./components/viewIngredient";
import ViewFood from "./components/viewFood";
import FoodOrder from "./components/foodOrder";
 
const App = () => {
 return (
   <div>
     {/* <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes> */}

      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/createRestaurant" element={<CreateRestaurant />} />
        <Route path="/createIngredient" element={<CreateIngredient />} />
        <Route path="/createFood" element={<CreateFood />} />
        <Route path="/viewRestaurant" element={<ViewRestaurant />} />
        <Route path="/viewIngredient" element={<ViewIngredient />} />
        <Route path="/viewFood" element={<ViewFood />} />
        <Route path="/purchaseIngredient" element={<PurchaseIngredient />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/home/:location" element={<Homepage />} />
        <Route path="/order" element={<FoodOrder />} />
      </Routes>

   </div>
 );
};
 
export default App;
