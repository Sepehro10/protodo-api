const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Get user lists
router.get("/", async (req, res) => {
	try {
		const ownerId = req.user.id;
		const getLists = await prisma.lists.findMany({
			where: { ownerId },
		});
		res.json({ success: true, list: [...getLists], msg: "Success" });
	} catch (err) {
		console.error(err.message);
	}
});

// Create a list
router.post("/", async (req, res) => {
	try {
		const ownerId = req.user.id;
		const listName = req.body.listName;
		const addList = await prisma.lists.create({
			data: {
				ownerId,
				listName,
			},
		});
		res.json({ success: true, list: addList, msg: "List created successfully" });
	} catch (err) {
		console.error(err.message);
	}
});

// Update a list
router.put("/", async (req, res) => {
	try {
		const ownerId = req.user.id;
		const listName = req.body.listName;
		const listId = req.body.listId;
		const updateList = await prisma.lists.update({
			where: { id: listId },
      		data: { listName: listName },
		});
		res.json({ success: true, list: updateList, msg: "List updated successfully" });
	} catch (err) {
		console.error(err.message);
	}
});

// Delete a list
router.delete("/", async (req, res) => {
	try {
		const listId = req.body.listId;
		const delTodos = await prisma.todos.deleteMany({
			where: {
				listId: listId,
			},
		});
		const delList = await prisma.lists.delete({
			where: {
				id: listId,
			},
		});
		res.json({ success: true, list: delList, msg: "List deleted successfully" });
	} catch (err) {
		console.error(err.message);
	}
});

//view a list with Todo items in it
router.post("/view", async (req, res) => {
	try {
		const listId = req.body.listId;
		const getTodos = await prisma.todos.findMany({
			where: { listId },
		});
		res.json({ success: true, list: [...getTodos], msg: "Success" });
	} catch (err) {
		console.error(err.message);
	}
});

module.exports = router;
