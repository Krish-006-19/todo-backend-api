const Todo = require("../models/todo");

async function getAllTodos(req, res) {
  try {
    const todo = await Todo.find();
    if (!todo[0]) return res.json({ msg: "No data!" });
    else return res.json({ todo });
  } catch (error) {
    console.error(error);
  }
}

async function addTodo(req, res) {
  try {
    const { title, description, priority, due_date } = req.body;

    if (!title || !description)
      return res.status(400).json({ msg: "Title and description required!" });

    let todo = await Todo.findOne({ user: req.user.id });

    if (!todo) {
      todo = await Todo.create({
        user: req.user.id,
        user_todos: [{
          title,
          description,
          priority: priority || "low",
          due_date: due_date || new Date(),
        }],
      });
    } else {
      todo.user_todos.push({
        title,
        description,
        priority: priority || "low",
        due_date: due_date || new Date(),
      });
      await todo.save();
    }

    return res.status(201).json({ msg: "Todo added successfully!", todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error!" });
  }
}
async function updateTodo(req, res) {
  try {
    const { title, description, priority, due_date, completed} = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: { 
                "user_todos.$[elem].title": title,
                "user_todos.$[elem].description": description,
                "user_todos.$[elem].priority": priority,
                "user_todos.$[elem].due_date": due_date,
                "user_todos.$[elem].completed": completed
              },
      },
      {
        arrayFilters: [{ "elem._id": req.params.subid }],
        new: true,
        timestamps:false
      }
    );
    // await todo.save();
    if (!todo) return res.status(404).json({ msg: "user not found!" });
    return res.status(201).json({ msg: "edited successfully!" });
  } catch (err) {
    console.error(err);
  }
}

async function deleteTodo(req, res) {
  try {
    const { _id } = req.params; 
    const todo = await Todo.findOne({ user: req.user.id });
    if (!todo) return res.status(404).json({ msg: "Todo not found!" });

    todo.user_todos = todo.user_todos.filter(t => t._id.toString() !== _id);
    await todo.save();

    return res.status(200).json({ msg: "Todo deleted successfully!", todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error!" });
  }
}

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo
};