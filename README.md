# Alba Consulting Task Management App

A professional, full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **User Authentication**: Secure signup and login with JWT.
- **Task Management**: Create, edit, delete, and mark tasks as completed.
- **Organization**: Categorize tasks (Work, Personal, Client Projects) and assign priorities (Low, Medium, High).
- **Deadlines**: Set date and time for tasks with automatic overdue detection.
- **Dashboard**: Professional glassmorphic UI with summary statistics and advanced filtering.
- **Notifications**: Visual alerts for upcoming deadlines (next 48 hours).

## Tech Stack
- **Frontend**: React, Vite, Lucide Icons, Date-fns, Axios.
- **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt.
- **Database**: MongoDB.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a connection string

### Installation

1. **Backend Setup**:
   ```bash
   cd server
   npm install
   # Update .env with your MONGO_URI if necessary
   npm run dev
   ```

2. **Frontend Setup**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Aesthetic
The application uses a **Professional Consulting** theme with:
- Deep navy and slate color palette.
- Glassmorphism effects for cards and modals.
- Clean typography (Inter & Outfit).
- Responsive grid layout.
