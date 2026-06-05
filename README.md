# Real-Time Collaboration Tool

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: MEET BHAVIN PATEL

**INTERN ID**: CTIS9971

**DOMAIN**: MERN STACK WEB DEVELOPMENT

**BATCH DURATION**: MAY 09th, 2026 to JUNE 6th, 2026

**MENTOR NAME**: NEELA SANTHOSH KUMAR

## Description

This is a real-time collaborative document editing web application built using the MERN stack (MongoDB, Express.js, React, Node.js), Socket.IO for real-time communication, and Quill as the text editor.

## Features

### 1. Document Collaboration
Users can create documents and collaborate with others in real-time. Collaborators can simultaneously edit the document, and changes are instantly reflected for all participants.

### 2. Collaborator Presence
The web app displays a list of online collaborators for each document. Users can see who else is currently active in the document, making collaboration more transparent.

### 3. Email Verification
To enhance security and user authentication, the application implements email verification for user accounts. Users receive an email with a verification link upon registration.

### 4. Real-Time Editing
Quill, a powerful and customizable WYSIWYG editor, is integrated into the application to provide a seamless real-time editing experience. Users can see live updates as collaborators edit the document.

## Technologies Used

- **MERN Stack:**
  - MongoDB: NoSQL database for storing user data and document content.
  - Express.js: Backend framework for building the API.
  - React: Frontend library for building the user interface.
  - Node.js: JavaScript runtime for server-side development.

- **Socket.IO:**
  - Enables real-time bidirectional communication between clients and the server. Used for collaborative editing and presence tracking.

- **Quill:**
  - Feature-rich WYSIWYG editor used for document editing. Customized for real-time collaboration.

## Getting Started

Follow these steps to run the application locally:

### 1. Clone the repository:
```bash
git clone https://github.com/MeetPatel3905/-Real-Time-Collaboration-Tool.git
cd -Real-Time-Collaboration-Tool
```

### 2. Install dependencies for backend:
```bash
npm install
```

### 3. Install dependencies for frontend:
```bash
cd src/client
npm install
```

### 4. Set up .env variables by creating a .env file in the root directory:
```bash
MONGODB_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
PORT=8000
PASSWORD=your_app_password_for_email
EMAIL=your_gmail_email
BACKEND_URL=your_backend_url/api/v1
FRONTEND_URL=your_frontend_url
PRODUCTION=false
```

### 5. Run the backend:
```bash
npm run dev
```

### 6. Run the frontend (in another terminal):
```bash
cd src/client
npm run dev
```

### 7. Access the application in your browser at http://localhost:5173

## Project Structure

```
Real-Time-Collaboration-Tool/
├── src/
│   ├── client/                 # Frontend (Vite React)
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── context/
│   │   │   ├── helpers/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── controllers/            # Business logic
│   ├── models/                 # Database schemas
│   ├── routes/                 # API routes
│   ├── middlewares/            # Middleware functions
│   ├── utils/                  # Utility functions
│   ├── server.js               # Main server file
│   └── package.json
├── .gitignore
├── README.md
└── package.json
```

## API Routes

### Authentication Routes:
- `POST /api/v1/users/register` - Register a new user
- `GET /api/v1/users/verifyemail/:tokenId` - Verify email
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users/me` - Get current user info

### Document Routes:
- `GET /api/v1/documents` - Get all user documents
- `POST /api/v1/documents` - Create new document
- `GET /api/v1/documents/:documentId` - Get specific document
- `PATCH /api/v1/documents/:documentId` - Update document
- `DELETE /api/v1/documents/:documentId` - Delete document
- `PATCH /api/v1/documents/add-collaborator/:documentId` - Add collaborator
- `GET /api/v1/documents/get-all-collaborators/:documentId` - Get all collaborators

## Socket Events

- `joinRoom` - Join a collaboration room
- `leaveRoom` - Leave a collaboration room
- `send-changes` - Send document changes
- `receive-changes` - Receive document changes
- `send-cursor` - Send cursor position
- `receive-cursor` - Receive cursor position
- `get-doc` - Get document content
- `load-document` - Load document content
- `save-doc` - Save document
- `someoneJoined` - Someone joined the room
- `someoneLeft` - Someone left the room

## Contributing

Contributions are welcome! Please refer to the [Contributing Guidelines](contributing.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.