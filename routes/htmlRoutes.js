// Import necessary modules
const path = require('path');          // Node.js Path module for handling and transforming file paths
const express = require('express');    // Express.js library for handling web requests
const app = express();                 // Create a new Express application instance

// Endpoint to serve the 'notes.html' page when '/notes' route is accessed
app.get('/notes', (req, res) => {
    // Send the 'notes.html' file as a response
    // path.join() ensures a correct file path regardless of the OS
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Fallback endpoint to serve the 'index.html' page for all other routes
app.get('*', (req, res) => {
    // Send the 'index.html' file as a response
    // path.join() ensures a correct file path regardless of the OS
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Note: This code assumes that the server will be started elsewhere in your codebase, 
// as this script primarily focuses on route handling.
