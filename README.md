# Task Manager

A full-stack task management web application built as a monorepo. Users can create, view, edit, delete, and toggle tasks between **Pending** and **Completed** states. The backend exposes a RESTful API with Zod-based input validation, and the frontend provides a minimal, high-contrast dark interface.

---

## Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | React 19, Vite 7, Tailwind CSS 4 |
| Backend    | Node.js, Express 4            |
| Database   | MongoDB with Mongoose 8       |
| Validation | Zod 3                         |
| HTTP Client| Axios                         |

---

## Project Structure

```
koders-assignment/
├── backend/
│   ├── models/
│   │   └── Task.js                  # Mongoose schema and model
│   ├── routes/
│   │   └── taskRoutes.js            # Express router with CRUD endpoints
│   ├── validation/
│   │   └── taskValidation.js        # Zod schemas and validation middleware
│   ├── server.js                    # App entry point, DB connection, middleware
│   ├── .env                         # Environment variables (not committed)
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── taskApi.js           # Axios instance and API functions
│   │   ├── components/
│   │   │   ├── TaskForm.jsx         # Create and edit form with client validation
│   │   │   ├── TaskItem.jsx         # Single task card with actions
│   │   │   └── TaskList.jsx         # Renders task list or empty state
│   │   ├── App.jsx                  # Root component, state management, CRUD handlers
│   │   ├── main.jsx                 # React DOM entry point
│   │   └── index.css                # Tailwind import and custom scrollbar
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or higher
- **MongoDB** — either a local instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd koders-assignment
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (a template is already provided):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
```

Replace `MONGODB_URI` with your Atlas connection string if not running MongoDB locally.

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## API Reference

Base URL: `http://localhost:5000/api`

### Endpoints

| Method   | Endpoint              | Description                          | Request Body                                    |
| -------- | --------------------- | ------------------------------------ | ----------------------------------------------- |
| `GET`    | `/tasks`              | Retrieve all tasks (newest first)    | —                                               |
| `POST`   | `/tasks`              | Create a new task                    | `{ title: string, description?: string }`       |
| `PUT`    | `/tasks/:id`          | Update an existing task              | `{ title?: string, description?: string, status?: "pending" \| "completed" }` |
| `PATCH`  | `/tasks/:id/toggle`   | Toggle status (pending / completed)  | —                                               |
| `DELETE` | `/tasks/:id`          | Delete a task                        | —                                               |

### Response Format

All responses follow a consistent structure:

```json
{
  "success": true,
  "data": { ... }
}
```

Validation errors return status `400`:

```json
{
  "success": false,
  "errors": [
    { "field": "title", "message": "Title is required" }
  ]
}
```

### Validation Rules (Zod)

| Field         | Create         | Update         |
| ------------- | -------------- | -------------- |
| `title`       | Required, 1–100 chars | Optional, 1–100 chars |
| `description` | Optional, max 500 chars | Optional, max 500 chars |
| `status`      | —              | Optional, `"pending"` or `"completed"` |

---

## Task Model

| Field         | Type     | Default     | Notes                           |
| ------------- | -------- | ----------- | ------------------------------- |
| `title`       | String   | —           | Required, trimmed, max 100 chars |
| `description` | String   | `""`        | Trimmed, max 500 chars          |
| `status`      | String   | `"pending"` | Enum: `pending`, `completed`    |
| `createdAt`   | Date     | auto        | Mongoose timestamps             |
| `updatedAt`   | Date     | auto        | Mongoose timestamps             |

---

## Frontend Architecture

### Components

- **`App.jsx`** — Root component. Manages task state with `useState` and `useEffect`. Handles all CRUD operations by calling the API service layer and re-fetching on success. Displays toast notifications for user feedback.

- **`TaskForm.jsx`** — A dual-purpose form for both creating and editing tasks. Receives an `editingTask` prop to switch between modes. Performs client-side validation before submission (required title, character limits).

- **`TaskItem.jsx`** — Renders a single task card. Displays title, description, status badge, and creation date. Action buttons (toggle, edit, delete) appear on hover. Delete has a confirmation step.

- **`TaskList.jsx`** — Iterates over the tasks array and renders `TaskItem` components. Shows an empty-state message when no tasks exist.

### API Layer

`src/api/taskApi.js` exports five functions — `getTasks`, `createTask`, `updateTask`, `deleteTask`, `toggleTaskStatus` — each wrapping an Axios call to the backend.

---

## Scripts

### Backend (`/backend`)

| Script         | Command           | Description                     |
| -------------- | ----------------- | ------------------------------- |
| `npm run dev`  | `nodemon server.js` | Start with hot reload (dev)    |
| `npm start`    | `node server.js`    | Start without hot reload       |

### Frontend (`/frontend`)

| Script          | Command         | Description                    |
| --------------- | --------------- | ------------------------------ |
| `npm run dev`   | `vite`          | Start dev server with HMR      |
| `npm run build` | `vite build`    | Production build to `dist/`    |
| `npm run preview` | `vite preview` | Preview production build       |
| `npm run lint`  | `eslint .`      | Run ESLint                     |

---

## Environment Variables

| Variable      | Location       | Description                      |
| ------------- | -------------- | -------------------------------- |
| `PORT`        | `backend/.env` | Server port (default: `5000`)    |
| `MONGODB_URI` | `backend/.env` | MongoDB connection string        |

---

## Features

- Create tasks with a title and optional description
- View all tasks sorted by creation date (newest first)
- Edit existing task title and description
- Delete tasks with an inline confirmation prompt
- Toggle task status between Pending and Completed
- Server-side input validation with Zod
- Client-side form validation with error messages
- Toast notifications for success and error feedback
- Responsive, minimalist dark UI
