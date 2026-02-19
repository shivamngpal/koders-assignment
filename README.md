# Task Manager — Full-Stack Web Application

A simple task management application built with React, Express, and MongoDB.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Validation | Zod |

## Project Structure

```
├── backend/
│   ├── models/Task.js          # Mongoose schema
│   ├── routes/taskRoutes.js    # REST API endpoints
│   ├── validation/taskValidation.js  # Zod schemas + middleware
│   ├── server.js               # Express entry point
│   └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── api/taskApi.js      # Axios service layer
│   │   ├── components/
│   │   │   ├── TaskForm.jsx    # Create / Edit form
│   │   │   ├── TaskItem.jsx    # Individual task card
│   │   │   └── TaskList.jsx    # Task list container
│   │   └── App.jsx             # Main application
│   └── index.html
└── README.md
```

## Setup & Run

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (or an Atlas connection string)

### Backend
```bash
cd backend
npm install
# Edit .env and set your MONGODB_URI
npm run dev
```
Server starts at `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App opens at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `PATCH` | `/api/tasks/:id/toggle` | Toggle task status |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## Features
- ✅ Create tasks with title and description
- ✅ View all tasks in a sorted list
- ✅ Edit existing task details
- ✅ Delete tasks with confirmation
- ✅ Toggle tasks between Pending and Completed
- ✅ Zod input validation on the backend
- ✅ Client-side form validation
- ✅ Toast notifications for feedback
- ✅ Responsive, modern dark UI
