const { z } = require("zod");

// Schema for creating a new task
const createTaskSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(1, "Title cannot be empty")
        .max(100, "Title cannot exceed 100 characters"),
    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .default(""),
});

// Schema for updating an existing task
const updateTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title cannot be empty")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),
    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    status: z.enum(["pending", "completed"]).optional(),
});

// Validation middleware factory
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));
        return res.status(400).json({ success: false, errors });
    }
    req.body = result.data;
    next();
};

module.exports = { createTaskSchema, updateTaskSchema, validate };
