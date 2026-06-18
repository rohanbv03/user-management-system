# User Management System (AuthFlow)

A full-stack user authentication and profile management application built with the MERN stack (MongoDB, Express, React, Node.js). It supports user signup, login, and a protected profile page secured with JWT-based authentication.

## Technology Stack

**Backend**
- Node.js — JavaScript runtime
- Express.js — REST API framework
- MongoDB with Mongoose — database and ODM
- jsonwebtoken (JWT) — stateless authentication
- bcryptjs — password hashing
- cors — cross-origin request handling
- dotenv — environment variable management
- nodemon — auto-restart during development

**Frontend**
- React 18 — UI library
- Vite — build tool and dev server
- React Router DOM — client-side routing
- Axios — HTTP client
- Tailwind CSS — utility-first styling
- react-icons — icon set used in form inputs

## Project Structure

```
user-management-system/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js   # Verifies JWT on protected routes
│   ├── models/
│   │   └── User.js             # Mongoose schema (name, email, password)
│   ├── routes/
│   │   └── authRoutes.js       # /signup, /login, /profile endpoints
│   └── server.js               # Express app entry point
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Signup.jsx
│       │   ├── Login.jsx
│       │   └── Profile.jsx
│       ├── api.js              # Axios instance (baseURL config)
│       ├── App.jsx             # Route definitions
│       └── main.jsx            # React entry point
└── README.md
```

## Prerequisites

- Node.js v16 or later and npm
- A MongoDB database — either a local instance or a free MongoDB Atlas cluster
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/rohanbv03/user-management-system.git
cd user-management-system
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

This runs `nodemon server.js`. On success you should see `MongoDB Connected` and `Server running on port 5000` in the terminal.

### 3. Frontend setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

Vite will start the dev server, typically at `http://localhost:5173`. Open this URL in your browser to use the app.

> **Important:** The frontend's Axios instance (`frontend/src/api.js`) has its base URL hardcoded to `http://localhost:5000/api/auth`. Keep the backend `PORT` set to `5000`, or update `api.js` to match whatever port you configure.

## API Endpoints

| Method | Endpoint            | Auth Required | Description                              |
|--------|----------------------|----------------|------------------------------------------|
| POST   | `/api/auth/signup`   | No             | Creates a new user (name, email, password) |
| POST   | `/api/auth/login`    | No             | Authenticates a user and returns a JWT    |
| GET    | `/api/auth/profile`  | Yes (Bearer token) | Returns the logged-in user's name and email |

## Assumptions Made During Development

- A single JWT access token (1-day expiry) is used for authentication; there is no refresh token, token blacklisting, or logout-on-server mechanism — logout is handled client-side by clearing the token from `localStorage`.
- The token is stored in browser `localStorage` rather than an HTTP-only cookie, which is acceptable for a learning/demo project but is not recommended for production due to XSS exposure.
- Validation is kept minimal: the backend only checks that required fields are present and that the email is unique; there is no email format validation, password strength enforcement, or email verification flow.
- CORS is fully open (`cors()` with no restrictions) since the app is intended to run locally during development rather than in a deployed, multi-origin environment.
- MongoDB is assumed to be reachable via the `MONGO_URI` provided in `.env`; no seeding script or default data is included.
- The project assumes a single-role user model — there is no admin/user role distinction or permission system.
- No automated test suite is included at this stage; testing was done manually via the UI and API requests during development.

## Note on AI-Assisted Development

ChatGPT was used as an AI coding assistant throughout the development of this project. It helped scaffold the initial Express server and folder structure (middleware, models, routes), generate the JWT authentication and bcrypt password-hashing logic, and troubleshoot issues such as token verification errors and CORS configuration between the Vite frontend and Express backend. It was also used to speed up writing the React components and Tailwind CSS styling for the signup, login, and profile pages.

The main challenges were less about generating code and more about integrating and verifying it: making sure environment variables were wired correctly between the frontend's hardcoded API base URL and the backend's port, debugging mismatches between the token format expected by the middleware and the one sent by the frontend, and adapting AI-suggested code to fit the existing file structure rather than accepting it as-is. Overall, ChatGPT accelerated boilerplate-heavy parts of the build, but understanding and testing the authentication flow end-to-end still required manual debugging and verification.
