const express = require('express');
const router = express.Router();
const { createPoll, getPolls, getPollById, voteOnPoll } = require('../controller/pollController');
const { authenticate } = require('../middleware/authenticate ');

// Route to create a new poll
router.post('/createpoll', authenticate, createPoll);

// Route to get all polls
router.get('/getpoll',getPolls);

// Route to vote on a poll
router.post('/:id/vote', authenticate,voteOnPoll);

module.exports = router;
