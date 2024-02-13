//This file is the main router for the application. It will route the user to the correct page based on the URL entered.
const router = require('express').Router();

// This is the route for the notes page
const notesRouter = require('./notes');

// router.use to use the notesRouter
router.use('/notes', notesRouter);

module.exports = router;