const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const {
    createTaskSchema,
    updateTaskSchema,
    validate,
} = require("../validation/taskValidation");

const router = express.Router();

// GET /api/tasks — List all tasks (newest first)
router.get("/", async (req, res, next) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json({ success: true, data: tasks });
    } catch (error) {
        next(error);
    }
});

// POST /api/tasks — Create a new task
router.post("/", validate(createTaskSchema), async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
});

// PUT /api/tasks/:id — Update a task
router.put("/:id", validate(updateTaskSchema), async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid task ID" });
        }

        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
});

// PATCH /api/tasks/:id/toggle — Toggle task status
router.patch("/:id/toggle", async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid task ID" });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        task.status = task.status === "pending" ? "completed" : "pending";
        await task.save();

        res.json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/tasks/:id — Delete a task
router.delete("/:id", async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid task ID" });
        }

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
