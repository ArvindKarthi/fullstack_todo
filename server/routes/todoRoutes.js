const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

/* ******************
  "get" requests 
****************** */
// to get all todos.
router.get("/", todoController.todo_get_all);
// to get a single todo.
router.get("/:id", todoController.todo_get_single);

/* ******************
  "post" requests 
****************** */
// to create a new todo.
router.post("/create", todoController.todo_create_single);

/* ******************
  "put" requests 
****************** */
// to update a todo
router.put("/:id", todoController.todo_update_single);

/* ******************
  "delete" requests 
****************** */
// to delete a todo
router.delete("/:id", todoController.todo_delete_single);

module.exports = router;
