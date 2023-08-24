const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const apiRoutes = require('./routes/apiRoutes.js')

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/api/notes', apiRoutes);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

