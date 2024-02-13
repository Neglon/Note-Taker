//variables for required packages
const express = require('express');
const path = require('path')
const fs = require('fs');

//variable for when an api route is called
const api = require('./routes/index');

//variable for the port number
const PORT = 3001;

//variable for the express function
const app = express();

//middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to serve up static files from the public folder
app.use(express.static('public'));

//middleware for to use the api call from the index.js file
app.use('/api', api);

//middleware for the express function to get the index route and send the user to the index.html file
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//middleware for the express function to get the notes route and send the user to the notes.html file
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//listening for the port number
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);