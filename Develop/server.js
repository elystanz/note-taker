const express = require('express');
const fs = require('fs');
const path = require('path');
// const uuid = require('./helpers/uuid');
const noteData = require('./db/db.json');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));

// get all
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteData));

// post notes
app.post("/api/notes", (req, res) => {
    const newNote = req.body
    newNote.id = noteData.length.toString()
    noteData.push(newNote)
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteData))
    res.json(newNote)
  })

app.post('/api/notes', (req, res) => {
    const newNote = req.body
        newNote.id = noteData.length.toString()
        noteData.push(newNote)
        fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteData))
        res.json(newNote)
});

// delete note
// app.delete('/api/notes/:id', (req, res) => {
//     const deleteNote = notes.find((note) => note.id === req.params.id);
//     notes = notes.filter((note) => note.id != deleteNote.id);
//     fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));
//     res.json(deleteNote);
// });

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});