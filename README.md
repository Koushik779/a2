# Developer Directory App

A full-stack web application for managing and exploring a directory of developers. Built with React for the frontend and Node.js + Express for the backend, with MongoDB for data persistence.

## Features

- Add developer details with form validation
- Display developers in a clean, responsive UI
- Search developers by name or technology
- Filter developers by role (Frontend, Backend, Full-Stack)
- Toast notifications for success/error messages
- Fully responsive design for mobile and desktop

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Usage

1. Make sure both the backend server and frontend development server are running

2. Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)

3. Use the form on the left to add new developers:
   - Enter developer name
   - Select role from dropdown (Frontend, Backend, or Full-Stack)
   - Add technologies (comma-separated, e.g., "React, Node.js, MongoDB")
   - Enter years of experience

4. View all developers in the directory on the right side

5. Use the search bar to find developers by name or technology

6. Use the role filter to show only developers with specific roles

7. Click "Clear Filters" to reset search and filter options

## API Endpoints

### POST /developers
Add a new developer to the directory

**Request Body:**
```json
{
  "name": "John Doe",
  "role": "Full-Stack",
  "techStack": "React, Node.js, MongoDB",
  "experience": 3
}
```

**Response:**
```json
{
  "message": "Developer added successfully",
  "developer": {
    "_id": "...",
    "name": "John Doe",
    "role": "Full-Stack",
    "techStack": ["React", "Node.js", "MongoDB"],
    "experience": 3,
    "createdAt": "..."
  }
}
```

### GET /developers
Retrieve all developers (with optional filters)

**Query Parameters:**
- `role` (optional): Filter by role (Frontend, Backend, or Full-Stack)
- `tech` (optional): Filter by technology (case-insensitive partial match)

**Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "role": "Full-Stack",
    "techStack": ["React", "Node.js", "MongoDB"],
    "experience": 3,
    "createdAt": "..."
  }
]
```

## Project Structure

```
.
├── backend/
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   ├── DeveloperForm.jsx
│   │   ├── DeveloperList.jsx
│   │   └── Toast.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## Validation Rules

- Name: Required, cannot be empty
- Role: Required, must be one of: Frontend, Backend, Full-Stack
- Tech Stack: Required, at least one technology must be provided
- Experience: Required, must be a positive number

## Responsive Design

The application is fully responsive and works seamlessly on:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop screens (> 1024px)

## Toast Notifications

The app shows toast notifications for:
- Successfully adding a developer
- Error messages when something goes wrong
- Notifications auto-dismiss after 3 seconds
- Manual dismiss option available

## License

This project was created as part of the Talrn.com internship selection task.
