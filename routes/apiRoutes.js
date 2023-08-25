// Import necessary modules
const fs = require('fs');             // Node.js File System module for reading/writing files
const express = require('express');   // Express.js library for handling web requests
const app = express();                // Create a new Express application instance

// Endpoint to retrieve all notes
app.get('/', (req, res) => {
    // Read the notes from the file system
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // If an error occurs while reading the file, throw it
        if (err) throw err;
        // Respond with the parsed JSON data from the file
        res.json(JSON.parse(data));
    });
});

// Endpoint to save a new note
app.post('/', (req, res) => {
    const newNote = req.body;    // Extract the note data from the request body
    newNote.id = Date.now();    // Assign a unique ID to the note based on the current timestamp

    // Read existing notes from the file system
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;     // If an error occurs while reading, throw it
        const notes = JSON.parse(data);  // Parse the read data into a JavaScript object
        notes.push(newNote);    // Add the new note to the existing notes array

        // Write the updated notes back to the file system
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) throw err; // If an error occurs while writing, throw it
            res.json(newNote);  // Respond with the new note's data
        });
    });
});

// Endpoint to delete a note based on its ID
app.delete('/:id', (req, res) => {
    const noteId = parseInt(req.params.id); // Extract the ID from the request parameters and convert it to a number

    // Read existing notes from the file system
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;     // If an error occurs while reading, throw it
        let notes = JSON.parse(data);  // Parse the read data into a JavaScript object
        
        // Filter out the note that matches the provided ID
        notes = notes.filter(note => note.id !== noteId);

        // Write the updated notes (after deletion) back to the file system
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) throw err; // If an error occurs while writing, throw it
            res.json({ message: 'Note deleted!' }); // Respond with a success message
        });
    });
});

// Export the Express application instance for use in other modules
module.exports = app;
