// importing required modules
const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo.js");

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

// functions
const defaultError = (res, errMessage) => {
  res.status(400).send({ message: errMessage ? errMessage : "No match found" });
};

/* ******************
  "get" requests 
****************** */

// to get all todos.
app.get("/todos", (req, res) => {
  Todo.find()
    .then((data) => {
      res.send({ todosList: data });
    })
    .catch((err) => {
      defaultError(res, "Failed to get users list.");
    });
});

// to get a single todo.
app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    Todo.find({ _id: id })
      .then((data) => {
        res.send({
          todo: data[0]
        });
      })
      .catch((err) => {
        defaultError(res, "Failed to find user.");
      });
  } else {
    defaultError(res);
  }
});

/* ******************
  "post" requests 
****************** */

// to create a new todo.
app.post("/create/todo", (req, res) => {
  if (req?.body?.todo) {
    Todo.create(req.body.todo)
      .then(() => {
        res.send({ message: "User added successfully." });
      })
      .catch((err) => {
        defaultError(res, "Failed to add user.");
      });
  } else {
    defaultError(res);
  }
});

/* ******************
  "put" requests 
****************** */
app.put("/todo/:id", (req, res) => {
  const { id } = req.params;
  if (id && req?.body?.todo) {
    Todo.updateOne({ _id: id }, { $set: req.body.todo })
      .then(() => {
        res.send({ message: "User updated successfully." });
      })
      .catch((err) => {
        defaultError(res, "Failed to update user.");
      });
  } else {
    defaultError(res);
  }
});

/* ******************
  "delete" requests 
****************** */
app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    Todo.deleteOne({ _id: id })
      .then(() => {
        res.send({ message: "User deleted successfully." });
      })
      .catch((err) => {
        defaultError(res, "Failed to delete user.");
      });
  }
});

// middleware to be executed if no match found.
app.use((req, res) => {
  defaultError(res);
});
