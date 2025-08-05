# 🎧 KV-Audio Backend





## 📖 Overview

KV-Audio-Rent is a full-stack rental service built using the **MERN stack** (MongoDB, Express.js, React, Node.js), designed for renting audio equipment (e.g., speakers, microphones, mixers) and lighting systems (e.g., stage lights, LED panels). This repository contains the **backend** of the application, developed with **Node.js**, **Express.js**, and **MongoDB**. The backend provides a RESTful API to handle equipment management, user authentication, booking operations, and admin functionalities.

## ✨ Features

### 👤 User Features
- **Equipment Listing**: Retrieve a list of available audio and lighting equipment with filtering options (e.g., by type, specifications, or availability).
- **Booking System**: Create, view, and manage bookings for audio and lighting equipment.
- **User Authentication**: Secure registration and login using JWT.

### 🛠️ Admin Features
- **Equipment Management**: Add, update, or delete audio and lighting equipment.
- **User Management**: View, block, or unblock users.
- **Order Management**: Confirm or cancel bookings.
- **Secure Endpoints**: Role-based access control for admin routes.

## 🧪 Technologies Used
- **Node.js**: Runtime environment for the backend.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing equipment, users, and bookings.
- **Mongoose**: ODM for MongoDB to manage schema and queries.
- **JWT**: For secure authentication and authorization.
- **Bcrypt**: For password hashing.
- **dotenv**: For environment variable management.

## 🧰 Prerequisites
- **Node.js**: v16.x or higher
- **npm**: v8.x or higher
- **MongoDB**: Local or MongoDB Atlas
- A MongoDB connection string

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vinudasenith/kv-audio-backend.git
   cd audio-lights-rent-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```
   The server will start at `http://localhost:5000`.


## 🗂️ Project Structure
```
KV-Audio-backend/
├── controllers/          # Request handlers for routes
├── models/               # Mongoose schemas (User, Equipment, Booking)
├── routes/               # API route definitions
├── .env                  # Environment variables
├── index.js              # Entry point
├── package.json          # Project dependencies and scripts
```

## 📜 Available Scripts
- `npm start`: Runs the server in production mode.
- `npm test`: Runs the test suite (if configured).

## API Endpoints

### Public Routes
- `POST /api/users`: Register a new user.
- `POST /api/users/login`: Authenticate a user and return a JWT.
- `POST /api/orders`: Create a new booking.

### Admin Routes (Protected)
- `GET /api/users/all`: Get a list of all users.
- `PUT /api/users/block/:emnail`: Block or unblock a user.
- `POST /api/products`: Add new audio or lighting equipment.
- `PUT /api/products/:key`: Update equipment details.
- `DELETE /api/products/:key`: Delete equipment.
- `PUT /api/bookings/status/:orderId`: Confirm or Cancel a booking.


## 🔐 Authentication
- All protected routes require a JWT token in the `Authorization` header as `Bearer <token>`.
- Admin routes are restricted to users with an `admin` role, enforced via middleware.


## 🪪 License
This project is licensed under the [MIT License](LICENSE).



 <h2>📸 Screenshot of api-test-postman </h2>
 

![test](https://github.com/vinudasenith/kv-audio-backend/blob/master/screenshots/Screenshot%202025-08-05%20220845.png)

