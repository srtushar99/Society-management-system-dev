const Alert = require("../models/securityAlertModel");

//add alert 
exports.CreateAlert = async (req, res) => {
    try {
      const { alert_type, description } = req.body;
  
      if (!alert_type || !description) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const alert = new Alert({
        alert_type,
        description
      });
  
      await alert.save();
  
      
      return res.status(201).json({
        success: true,
        message: "Alert created successfully",
       
      });
    } catch (error) {
      console.error("Error creating alert:", error);
      return res.status(500).json({
        success: false,
        message: "Error in alert adding",
      });
    }
  };

//get complaint
exports.GetAlert = async (req, res) => {
    try {
      const alert = await Alert.find({})
      return res.status(200).json({
        success: true,
        data: alert,
      });
    } catch (error) {
      console.error("Error fetching alert:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching alert",
      });
    }
  };