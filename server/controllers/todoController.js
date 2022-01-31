const Todo = require("../models/todo.js");

// functions
const defaultError = (res, errMessage) => {
  res.status(400).send({ message: errMessage ? errMessage : "No match found" });
};

// controllers
const todo_get_all = (req, res) => {
  Todo.find()
    .then((data) => {
      res.send({ todosList: data });
    })
    .catch((err) => {
      defaultError(res, "Failed to get users list.");
    });
};

const todo_get_single = (req, res) => {
  const { id } = req.params;
  if (id) {
    Todo.find({ _id: id })
      .then((data) => {
        if (data && data[0]) {
          res.send({
            todo: data[0]
          });
        } else {
          defaultError(res, "Failed to find user.");
        }
      })
      .catch((err) => {
        defaultError(res, "Failed to find user.");
      });
  } else {
    defaultError(res);
  }
};

const todo_create_single = (req, res) => {
  if (req?.body?.todo) {
    Todo.create(req.body.todo)
      .then((data) => {
        res.send({ message: "User added successfully.", todo: data });
      })
      .catch((err) => {
        defaultError(res, "Failed to add user.");
      });
  } else {
    defaultError(res);
  }
};

const todo_update_single = (req, res) => {
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
};

const todo_delete_single = (req, res) => {
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
};

module.exports = {
  todo_get_all,
  todo_get_single,
  todo_create_single,
  todo_update_single,
  todo_delete_single
};
