import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import userRoutes from './routes/userRoutes.js';
import orgRoutes from './routes/orgRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:5000', 
    'https://tenton.vercel.app', 
    // Add more allowed origins as needed
  ];

// Middleware
app.use(cors(
    {
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true 
    }
)); // Enable CORS for all origins
app.options('*', cors()); // Enable preflight requests for all routes
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/organizations', orgRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsInsecure: false,
    ssl: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error(error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
