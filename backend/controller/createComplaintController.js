const Complaint = require('../models/createCamplaintModel');

// Create a new complaint

exports.createComplaint = async (req, res) => {
    try {
  
        const {
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
        } = req.body;

        if (!Complainer_name || !Complaint_name || !Description || !Wing || !Unit) {
            return res.status(400).json({
                success: false,
                message: "All required fields  must be provided.",
            });
        }

        const complaint = new Complaint({
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority: Priority || "Medium", 
            Status: Status || "Pending",
            createdBy: req.user?._id,      
            createdByType: req.user?.type 
        });

        await complaint.save();

        return res.status(201).json({
            success: true,
            message: "Complaint created successfully.",
            data: complaint,
        });
    } catch (error) {
        console.error("Error creating complaint:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the complaint. Please try again.",
        });
    }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json({ message: 'Complaints retrieved successfully', complaints });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaints', error });
    }
};

// Get a complaint by ID
exports.getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint retrieved successfully', complaint });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaint', error });
    }
};

// Update a complaint by ID
exports.updateComplaint = async (req, res) => {
    try {
        const {
            Complainer_name,
            Complaint_name,
            Description,
            Wing,
            Unit,
            Priority,
            Status,
            role
        } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { Complainer_name, Complaint_name, Description, Wing, Unit, Priority, Status, role },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint updated successfully', complaint });
    } catch (error) {
        res.status(400).json({ message: 'Error updating complaint', error });
    }
};

// Delete a complaint by ID
exports.deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting complaint', error });
    }
};

//Login user get Complaint

exports.getUserComplaints = async (req, res) => {
    try {
      const loggedInUserId = req.user.id;
      const userType = req.user.type;
  
      const complaints = await Complaint.find({
        createdBy: loggedInUserId,
        createdByType: userType
      })
      .populate({
        path: "createdBy",
        select: "name profileImage", 
      })
      
  
      console.log("User's Complaints:", complaints);
  
      return res.status(200).json({
        success: true,
        data: complaints,
      });
    } catch (error) {
      console.error("Error fetching complaints:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching complaints",
      });
    }
  };
