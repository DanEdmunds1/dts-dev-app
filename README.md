# DTS Dev App - Task Manager

A full-stack task management application built with React, TypeScript, and Node.js. Users can create, read, update, and delete tasks, with secure authentication and task ownership verification.

## Features

- **User Authentication**: JWT-based login and registration system
- **Task Management**: Create, read, update, and delete tasks
- **Task Ownership**: Tasks are tied to specific users; only owners can edit or delete their tasks
- **Status Tracking**: Tasks have status fields (Pending, In Progress, Completed)
- **Due Dates**: Set and track task due dates and times
- **User-Specific Tasks**: Tasks display owner information in the UI
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **CORS** for cross-origin requests

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user and receive JWT token

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:taskId` - Get single task
- `POST /api/tasks` - Create a new task (requires auth)
- `PUT /api/tasks/:taskId` - Update a task (requires auth, owner only)
- `DELETE /api/tasks/:taskId` - Delete a task (requires auth, owner only)

### Users
- `GET /api/users` - Get current user profile (requires auth)
- `PUT /api/users` - Update user image (requires auth)

## Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. Users register or log in to receive a token
2. Token is stored in localStorage
3. Token is included in the `Authorization` header for protected routes
4. Backend validates token in the `secureRoute` middleware

## Task Model

```typescript
interface Task {
  _id: string
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDateTime: string
  owner: string  // User ID
  createdAt?: string
  updatedAt?: string
}
```

## Key Features Implementation

### Task Ownership
- Tasks are tied to the user who created them via the `owner` field
- Only the owner can edit or delete their tasks
- The backend validates ownership before allowing updates/deletions
- The frontend shows visual indicators (blue border) for tasks you own

### Delete Functionality
- Deletes are confirmed with a dialog
- Axios is used for API requests
- Response status is validated (204 or 200)
- Task is removed from UI immediately on success

### Edit Functionality
- Clicking the ⋮ menu button shows Edit and Delete options
- Edit navigates to `/edit-task/:id` page
- Task data is pre-loaded using `singleTaskLoader`
- Updates are sent via the `updateTask` action

## Proxy Configuration

The frontend is configured to proxy `/api` requests to `http://localhost:3000` via Vite's proxy configuration in `vite.config.ts`.

## Development Notes

- **Frontend Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with utility classes
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router v6 with loaders and actions
- **API Client**: Axios with consistent headers
- **Backend Validation**: Ownership checks on all protected routes

## Future Improvements

- [ ] Add task categories/tags
- [ ] Implement task filtering and sorting
- [ ] Add notifications
- [ ] Implement task sharing with other users
- [ ] Add dark mode
- [ ] Implement task reminders/emails
- [ ] Add pagination for large task lists