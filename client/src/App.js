import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import CreateRestaurant from "./components/createRestaurant";
import LandingPage from "./components/landingPage";
import Homepage from "./components/home";
 
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
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/home/:location" element={<Homepage />} />
      </Routes>

   </div>
 );
};
 
export default App;
