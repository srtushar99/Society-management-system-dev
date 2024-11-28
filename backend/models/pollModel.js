const mongoose = require('mongoose'); // Import mongoose

const pollSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multichoice', 'ranking', 'rating', 'numeric', 'text'], 
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    },
    voters: [{ // Track which users voted for this option
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'createdByType',
    }]
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'createdByType',
  },
  createdByType: {
    type: String,
    enum: ['Owner', 'Tenante'],
  }
}, { timestamps: true });

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll; // Export the Poll model
