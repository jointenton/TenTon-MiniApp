const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const userRoutes = require('./routes/userRoutes');
const orgRoutes = require('./routes/orgRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
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
