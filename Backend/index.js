const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travel-agency')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Import routes
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locations');
const busRoutes = require('./routes/buses');

app.use('/api/auth', authRoutes);
app.use('/api/', locationRoutes);
app.use('/api/', busRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
