// importing required modules
const express = require("express");

// initiating our app
const app = express();

// listening for requests
app.listen(3000); //default host will be localhost

// logger middleware to log request details.
app.use((req, res) => {
  console.log("Middleware to log request details");
  console.log("host: ", req.hostname, " path: ", req.path);
});

// handles the get request at path = "/".
app.get("/", (req, res) => {
  res.send("<p>Welcome to node js.</p>"); //content type headers are not needed since we're using express they automatically determine it.
});

// redirect in express
app.get("/home", (req, res) => {
  res.redirect("/");
});

// middleware to be executed if no match found.
app.use((req, res) => {
  res.status(400).send("<p>Page Not Found</p>");
});
