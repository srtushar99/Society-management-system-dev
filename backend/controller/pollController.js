// const Poll = require('../models/pollModel');

// // Create a new poll
// exports.createPoll = async (req, res) => {
//     try {
//       const { author, title, type, options } = req.body;
  
//       // Validate required fields
//       if (!author || !title || !type || !options) {
//         return res.status(400).json({
//           success: false,
//           message: "All fields are required.",
//         });
//       }
  
//       // Create and save the new poll
//       const newPoll = new Poll({
//         author,
//         title,
//         type,
//         options,
//       });
//       const userType = req.user.Resident_status;

//       if (userType !== 'Owner' && userType !== 'Tenante') {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid user type for creating a poll",
//         });
//     }
    
//       const savedPoll = await newPoll.save();
  
//       // Respond with the saved poll
//       return res.status(201).json({
//         success: true,
//         message: "Poll created successfully.",
//         data: savedPoll,
//       });
//     } catch (err) {
//       console.error("Error creating poll:", err);
//       return res.status(500).json({
//         success: false,
//         message: "An unexpected error occurred while creating the poll. Please try again later.",
//       });
//     }
//   };
  

// // Get all polls
// exports.getPolls = async (req, res) => {
//     try {
//         const polls = await Poll.find();
//         res.json(polls);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get a specific poll
// exports.getPollById = async (req, res) => {
//     try {
//         const poll = await Poll.findById(req.params.id);
//         if (!poll) {
//             return res.status(404).json({ error: 'Poll not found' });
//         }
//         res.json(poll);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Vote on a poll
// exports.voteOnPoll = async (req, res) => {
//     try {
//         const poll = await Poll.findById(req.params.id);
//         if (!poll) {
//             return res.status(404).json({ error: 'Poll not found' });
//         }

//         const { optionIndex } = req.body;
//         poll.options[optionIndex].votes++;
//         await poll.save();

//         res.json(poll);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };
const Poll = require('../models/pollModel');

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { author, title, type, options } = req.body;

    // Validate required fields
    if (!author || !title || !type || !options || options.length < 2) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, and a poll must have at least two options.",
      });
    }

    const userType = req.user?.Resident_status;

    if (userType !== 'Owner' && userType !== 'Tenante') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized user type for creating a poll.',
      });
    }

    // Create and save the new poll
    const newPoll = new Poll({
      author,
      title,
      type,
      options,
      createdBy: req.user._id,
      createdByType: userType,
    });

    const savedPoll = await newPoll.save();

    return res.status(201).json({
      success: true,
      message: 'Poll created successfully.',
      data: savedPoll,
    });
  } catch (err) {
    console.error('Error creating poll:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while creating the poll.',
    });
  }
};

// Get all polls
exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    return res.status(200).json(polls);
  } catch (err) {
    console.error('Error fetching polls:', err);
    return res.status(500).json({ error: 'Failed to fetch polls.' });
  }
};

// Vote on a poll
exports.voteOnPoll = async (req, res) => {
  try {
    const { optionIndex } = req.body; // The index of the option being voted for
    const userId = req.user._id; // Assuming `req.user._id` is set by authentication middleware
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found.' });
    }

    // Validate the option index
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid option index.' });
    }

    // Check if the user has already voted and remove their previous vote
    let hasChangedOption = false;

    // Use a session to ensure atomic operations
    const session = await Poll.startSession();
    session.startTransaction();

    try {
      // Iterate over the options to find and remove the user's previous vote
      for (const option of poll.options) {
        if (option.voters?.includes(userId)) {
          hasChangedOption = true;
          option.votes--; // Decrement the previous vote
          option.voters = option.voters.filter((voter) => voter.toString() !== userId.toString());
        }
      }

      // Add the user's vote to the new option
      poll.options[optionIndex].votes++;
      poll.options[optionIndex].voters = poll.options[optionIndex].voters || [];
      poll.options[optionIndex].voters.push(userId);

      // Save the poll with the updated vote
      await poll.save({ session });
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: hasChangedOption
          ? 'Vote updated successfully.'
          : 'Vote cast successfully.',
        data: poll,
      });
    } catch (err) {
      // If an error occurs, roll back the transaction
      await session.abortTransaction();
      session.endSession();
      console.error('Error voting on poll:', err);
      return res.status(500).json({ error: 'Failed to cast vote.' });
    }
  } catch (err) {
    console.error('Error voting on poll:', err);
    return res.status(500).json({ error: 'Failed to cast vote.' });
  }
};



