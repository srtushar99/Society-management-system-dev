const Alert = require("../models/securityAlertModel");

//add alert 
exports.CreateAlert = async (req, res) => {
  try {
    const { alert_type, description } = req.body;

    if (!alert_type || !description) {
      return res.status(400).json({
        success: false,
        message: "Both 'alert_type' and 'description' are required.",
      });
    }

    const alert = new Alert({
      alert_type,
      description,
    });

    await alert.save();

    return res.status(201).json({
      success: true,
      message: "Alert has been successfully created.",
    });
  } catch (error) {
    console.error("Error occurred while creating the alert:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the alert. Please try again later.",
    });
  }
};


//get complaint
exports.GetAlert = async (req, res) => {
  try {
    const alerts = await Alert.find({});

    if (!alerts || alerts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No alerts found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Alerts retrieved successfully.",
      data: alerts,
    });
  } catch (error) {
    console.error("Error occurred while fetching alerts:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while fetching alerts. Please try again later.",
    });
  }
};
