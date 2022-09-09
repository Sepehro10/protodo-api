const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(["t", "o", "d", "o"]);
});

//create a todo
router.post("/", async (req, res) => {
  try {
    const { listId, todoName, description, completed } = req.body;
    const addTodo = await prisma.todos.create({
      data: {
        listId,
        todoName,
        description,
        completed: Boolean(completed),
      },
    });
    res.json({ success: true, list: addTodo, msg: "Todo created successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

//mark a todo as done/not done
router.put("/", async (req, res) => {
  try {
    const { todoId, completed } = req.body;
    const updateTodo = await prisma.todos.update({
      where: { id: todoId },
      data: { completed: Boolean(completed) },
    });
    res.json({ success: true, list: updateTodo, msg: "Todo updated successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

//edit a todo
router.put("/edit", async (req, res) => {
  try {
    const { todoId, todoName, description, completed } = req.body;
    const updateTodo = await prisma.todos.update({
      where: { id: todoId },
      data: {
        todoName,
        description,
        completed: Boolean(completed),
      },
    });
    res.json({ success: true, list: updateTodo, msg: "Todo updated successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
router.delete("/", async (req, res) => {
  try {
    const { todoId } = req.body;
    const delTodo = await prisma.todos.delete({
      where: { id: todoId },
    });
    res.json({ success: true, list: delTodo, msg: "Todo deleted successfully" });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
