const express = require("express");
const router = express.Router();
const { verifyToken } = require("../jwt");
const {getAllTodos,addTodo, updateTodo, deleteTodo } = require("../controllers/todo");
router.get("/", verifyToken, getAllTodos);
router.post("/", verifyToken, addTodo);
router.patch("/:id", verifyToken, updateTodo);
router.delete("/", verifyToken, deleteTodo);

module.exports = router;