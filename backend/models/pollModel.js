const mongoose = require('mongoose'); // Import mongoose

const pollSchema = new mongoose.Schema({


  type: {
    type: String,
    enum: [
      "Multichoice polls",
      "Numeric Polls",
      "Ranking polls",
      "Rating Polls",
      "Text poll",
    ],
   
  },
  title: {
    type: String,
   
  },
  options: [{
    text: {
      type: String,
      
    },
    votes: {
      type: Number,
    },
    voters: [{ // Track which users voted for this option
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'createdByType',
    }]
  }],
  min_values:{
    type: String,
  },
  max_values:{
    type: String,
  },
  desimal_places:{
    type:String,
  },
  answar:{
    type:String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'createdByType',
  },
  createdByType: {
    type: String,
    enum: ['Owner', 'Tenant'],
  }
}, { timestamps: true });

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll; // Export the Poll model
