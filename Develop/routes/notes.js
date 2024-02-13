// variables for the express router and uuid packages
const notes = require('express').Router();
const uuid = require('../helpers/uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// This API route is a GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// This API route is a POST Route for a new Note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present in the request body then create a new note
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    // Use the helper function to append the new note to the db.json file
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((data) => {
      // Result holds the array, that gets filtered to essentially remove the note that does not have matching ids as it iterates through the array
      const result = data.filter((note) => note.id !== noteId);

      writeToFile('./db/db.json', result);

      res.json(`Note with ${noteId} has been succesfully deleted`);
    });

});
module.exports = notes;