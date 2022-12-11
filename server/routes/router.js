const express = require("express");
 
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /restaurant.
const router = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the restaurants.
router.route("/restaurant").get(function (req, res) {
 let db_connect = dbo.getDb("hubgrub_full_db");
 db_connect
   .collection("restaurant")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a list of all the ingredients.
router.route("/ingredient").get(function (req, res) {
  let db_connect = dbo.getDb("hubgrub_full_db");
  db_connect
    .collection("ingredient")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This section will help you get a list of all the menu items.
router.route("/food").get(function (req, res) {
  let db_connect = dbo.getDb("hubgrub_full_db");
  db_connect
    .collection("food")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// This section will help you get a single restaurant by id
router.route("/restaurant/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("restaurant")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a restaurant grouping by revenue
router.route("/restaurant/:low/:high").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { revenue: {$gte: parseInt(req.params.low), $lte: parseInt(req.params.high)} };
  db_connect
    .collection("restaurant")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// This section will help you create a new restaurant.
router.route("/restaurant/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   location: req.body.location,
   revenue: req.body.revenue,
   cost: req.body.cost,
 };
 db_connect.collection("restaurant").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});


// This section will help you create a new ingredient.
router.route("/ingredient/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    price: parseFloat(req.body.price),
    calories: parseInt(req.body.calories),
    units: req.body.units,
  };
  db_connect.collection("ingredient").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

 // This section will help you get a ingredient grouping by price
router.route("/ingredient/:low/:high").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { price: {$gte: parseInt(req.params.low), $lte: parseInt(req.params.high)} };
  db_connect
    .collection("ingredient")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This section will help you get a food grouping by price
 router.route("/food/:low/:high").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { price: {$gte: parseInt(req.params.low), $lte: parseInt(req.params.high)} };
  db_connect
    .collection("food")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 // This section will help you create a new recipe.
router.route("/food/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    price: parseFloat(req.body.price),
  };
  db_connect.collection("food").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

 
// This section will help you update a record by id.
router.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     location: req.body.location,
     revenue: req.body.revenue,
     cost: req.body.cost,
   },
 };
 db_connect
   .collection("restaurant")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a restaurant
router.route("/restaurant/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("restaurant").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = router;