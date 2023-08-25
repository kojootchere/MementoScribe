// Import the required Node.js modules
const path = require('path');          // Node.js Path module for handling and transforming file paths
const express = require('express');    // Express.js library for building web applications

// Create an instance of an Express application
const app = express();

// Set the port for the application to either the environment's specified port or 3000 if none is provided
const PORT = process.env.PORT || 3000;

// Import API routes from './routes/apiRoutes.js'
const apiRoutes = require('./routes/apiRoutes.js');

// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Import CORS middleware to handle Cross-Origin Resource Sharing and allow for cross-origin requests
const cors = require('cors');

// Use the CORS middleware for our Express application
app.use(cors());

// Use built-in Express.js middleware for parsing URL-encoded bodies (from forms, for instance)
app.use(express.urlencoded({ extended: true }));

// Use built-in Express.js middleware for parsing JSON
app.use(express.json());

// Serve static files (like CSS, JS, and images) from the 'public' directory
// Using '/static' prefix for the path
app.use('/static', express.static(path.join(__dirname, 'public')));

// Use the API routes when the '/api/notes' path is accessed
app.use('/api/notes', apiRoutes);

// Endpoint to serve the 'notes.html' page when '/notes' route is accessed
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Fallback endpoint: if no other route matches, serve the 'index.html' page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
