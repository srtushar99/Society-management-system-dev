const Visitor = require("../models/securityVisitorModel");
const moment = require('moment');


//add visitor

exports.CreateVisitor = async (req, res) => {
  try {
    const { visitor_Name, number, date, wing, unit, time } = req.body;

    if (!visitor_Name || !number || !wing || !unit) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const formattedDate = moment(date, 'DD/MM/YYYY', true).toDate();

    if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Please use DD/MM/YYYY.",
      });
    }

    const visitor = new Visitor({
      visitor_Name,
      number,
      date: formattedDate,
      wing,
      unit,
      time,
    });

    await visitor.save();

    return res.status(200).json({
      success: true,
      message: "Visitor successfully added",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get complaint
exports.GetAllVisitor = async (req, res) => {
    try {
      const visitor = await Visitor.find({})
        .sort({ wing: 1, unit: 1 }); 
  
      return res.status(200).json({
        success: true,
        data: visitor,
      });
    } catch (error) {
      console.error("Error fetching visitor:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching visitor",
      });
    }
  };

// filter visitor
exports.FilterVisitor = async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const currentDate = new Date();
    let dateFrom, dateTo;

    
    if (timePeriod === "lastWeek") {
      
      dateFrom = new Date(currentDate);
      dateFrom.setDate(currentDate.getDate() - 7);  
      dateTo = currentDate;  

    } else if (timePeriod === "lastMonth") {
     
      dateFrom = new Date(currentDate);
      dateFrom.setMonth(currentDate.getMonth() - 1);  
      dateTo = currentDate;  

    } else if (timePeriod === "lastYear") {
      
      dateFrom = new Date(currentDate);
      dateFrom.setFullYear(currentDate.getFullYear() - 1);  
      dateTo = currentDate;  

    } else {
      
      dateFrom = null;
      dateTo = null;
    }

    
    const filter = dateFrom && dateTo ? { date: { $gte: dateFrom, $lte: dateTo } } : {};

    
    const visitors = await Visitor.find(filter).sort({ wing: 1, unit: 1 });

   
    return res.status(200).json({
      success: true,
      data: visitors,
    });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching visitors",
    });
  }
};
