// importing required modules
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

// initiating our app
const app = express();

// connecting to DB
mongoose.connect(
  "mongodb://localhost/testdb",
  () => {
    // listening for requests after the db is connected.
    app.listen(3000); //default host will be localhost.
  },
  (err) => {
    console.log(err);
  }
);

// parsers for url & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.raw());

// importing todo routes and scoping to todos.
app.use("/todos", todoRoutes);

// functions
const defaultError = (res, errMessage) => {
  res.status(400).send({ message: errMessage ? errMessage : "No match found" });
};

// middleware to be executed if no match found.
app.use((req, res) => {
  defaultError(res);
});
