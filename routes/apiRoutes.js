const fs = require('fs');

// Get all notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// Save a new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    // Give the note a unique ID
    newNote.id = Date.now();

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);

        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) throw err;
            res.json({ message: 'Note deleted!' });
        });
    });
});
