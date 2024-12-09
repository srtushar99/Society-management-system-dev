const Request = require('../models/requestTrackingModel');

// Create a new request
exports.createRequest = async (req, res) => {
    try {
        const { Requester_name, Request_name, Request_date,Description, Wing, Unit, Priority, Status} = req.body;

        if (!Requester_name || !Request_name || !Request_date|| !Description || !Wing || !Unit || !Priority || !Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const request = new Request({
            Requester_name,
            Request_name,
            Request_date,
            Description,
            Wing,
            Unit,
            Priority: Priority || "Medium",
            Status: Status || "Open",
            createdBy: req.user._id, 
            createdByType: req.user.type, 
            
        });

        await request.save();
        res.status(201).json({ message: 'Request created successfully', });
    } catch (error) {
        res.status(400).json({ message: 'Error creating request', error });
    }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
      const request = await Request.find({})
        .populate("createdBy", "profileImage") 
        .sort({ wing: 1, unit: 1 }); 
  
      return res.status(200).json({
        success: true,
        data: request,
      });
    } catch (error) {
      console.error("Error fetching request:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching request",
      });
    }
  };

// Get a request by ID

exports.getRequestById = async (req, res) => {
    try {
        const requestid=req.params.id
        const request= await Request.findById(requestid)
          .populate("createdBy", "profileImage") 
          .sort({ wing: 1, unit: 1 }); 
          
        return res.status(200).json({
          success: true,
          data: request,
        });
      } catch (error) {
        console.error("Error fetching request:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching request",
        });
      }
    };

// Update a request by ID
exports.updateRequest = async (req, res) => {
    try {
        const { Requester_name, Request_name, Request_date, Description, Wing, Unit, Priority, Status, role } = req.body;

        if (!Requester_name || !Request_name || !Request_date|| !Description || !Wing || !Unit || !Priority || !Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { Requester_name, Request_name, Request_date,Description, Wing, Unit, Priority, Status, role },
            { new: true, runValidators: true }
        );

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Request updated successfully', request });
    } catch (error) {
        res.status(400).json({ message: 'Error updating request', error });
    }
};

// Delete a request by ID
exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting request', error });
    }
};

//Login user adding Complaint
exports.getUserRequest = async (req, res) => {
    try {
      const loggedInUserId = req.user.id;
      const userType = req.user.type; 
  
      const income = await Request.find({
        createdBy: loggedInUserId,
        createdByType: userType
      })
      .populate({
        path: "createdBy",
        select: "name profileImage", 
      })
     
  
      return res.status(200).json({
        success: true,
        data: income,
      });
    } catch (error) {
      console.error("Error fetching income:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching income",
      });
    }
  };