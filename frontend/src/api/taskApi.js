import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getTasks = () => API.get("/tasks");

export const createTask = (taskData) => API.post("/tasks", taskData);

export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const toggleTaskStatus = (id) => API.patch(`/tasks/${id}/toggle`);
