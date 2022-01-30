const express = require("express");
const Todo = require("../models/todo.js");

const router = express.Router();

// functions
const defaultError = (res, errMessage) => {
  res.status(400).send({ message: errMessage ? errMessage : "No match found" });
};

/* ******************
  "get" requests 
****************** */

// to get all todos.
router.get("/", (req, res) => {
  Todo.find()
    .then((data) => {
      res.send({ todosList: data });
    })
    .catch((err) => {
      defaultError(res, "Failed to get users list.");
    });
});

// to get a single todo.
router.get("/:id", (req, res) => {
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
router.post("/create", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
