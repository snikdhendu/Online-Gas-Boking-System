import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL if it's different
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add methods as needed
    credentials: true, // If you need cookies/auth tokens
  }));
  
app.use(express.json());

// Import routes


// Use routes


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log("MongoDB connection error:", error));

// Base route
app.get('/', (req, res) => {
    res.send("Welcome to the Data Leakage Detection System API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
