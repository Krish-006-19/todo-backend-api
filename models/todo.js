const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_todos: [
      { 
        _id: {
          type: String,
          default: () => nanoid(8),
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        priority: {
          type: String,
          enum: ['low', 'medium', 'high'],
          default: 'medium',
          required: true,
        },
        due_date: Date,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema)