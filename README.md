# Notes App

A full-stack CRUD application for creating, searching, and managing notes, built with Express and MongoDB.

## Features

- Create, read, update, and delete notes (full CRUD)
- Search notes by keyword (matches title or body)
- Filter notes by category
- RESTful API design (`GET`, `POST`, `PUT`, `DELETE`)

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Frontend:** Vanilla JavaScript, HTML, CSS (no framework)

## Running Locally

1. Clone this repo:
   ```bash
   git clone https://github.com/ryanmasonmusic/notes-app.git
   cd notes-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your own MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your browser.

## API Endpoints

| Method | Route         | Description                          |
|--------|---------------|---------------------------------------|
| GET    | `/notes`      | Get all notes (supports `?search=` and `?category=` query params) |
| POST   | `/notes`      | Create a new note                    |
| PUT    | `/notes/:id`  | Update an existing note              |
| DELETE | `/notes/:id`  | Delete a note                        |

## What This Project Demonstrates

- Building a REST API from scratch with Express
- Connecting a Node.js app to a MongoDB database with Mongoose
- DOM manipulation and event handling in vanilla JavaScript
- Async/await and `fetch` for client-server communication
- Environment variable management for secrets (`.env`, gitignored)
