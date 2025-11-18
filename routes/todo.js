const express = require("express");
const router = express.Router();
const { verifyToken } = require("../jwt");
const {getAllTodos,addTodo, updateTodo, deleteTodo } = require("../controllers/todo");
router.get("/:id", verifyToken, getAllTodos);
router.post("/", verifyToken, addTodo);
router.patch("/:id/:subid", verifyToken, updateTodo);
router.delete("/:_id", verifyToken, deleteTodo);
module.exports = router;