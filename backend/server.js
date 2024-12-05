// const express = require("express");
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// const bodyParser = require("body-parser")

// require("./config/db");
// require("dotenv").config();


// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const cookieParser = require('cookie-parser');

// app.use(cookieParser());

// const userRoutes = require("./routes/userRoutes");
// const societyRoutes = require("./routes/societyRoutes");
// const importantNumberRoutes = require("./routes/importantNumberRoutes");
// const residentRoute = require("./routes/residentRoute")
// const expensesRoute = require("./routes/expensesRoutes")
// const noteRoute = require("./routes/noteRoutes")
// const facilityRoute = require("./routes/facilityRoutes")
// const complaintRoute = require("./routes/createComplaintRoutes")
// const requestsRoute = require("./routes/requestTrackingRoutes")
// const securityprotocolRoute = require("./routes/securityProtocolRoutes")
// const annoucementRoute = require("./routes/annoucementRoutes")
// const securityGuardRoute = require("./routes/securityGuardRoutes")
// const incomeRoute = require("./routes/incomeRoutes")
// const maintenanceRoute = require("./routes/maintenanceRoutes")
// const visitorRoute = require("./routes/visitorRoute")
// const alertRoute = require("./routes/alertRoute")
// const pollRoute = require("./routes/pollRoutes")
// const cateRoute = require("./routes/chatRoute")

// //user registration and login schema
// app.use("/api/v1",userRoutes);

// //create society api
// app.use('/api/societies', societyRoutes);

// //create Important Number
// app.use('/api/v2/important-numbers', importantNumberRoutes);

// //resident apis
// app.use('/api/v2/resident', residentRoute);

// // financial management
// app.use('/api/v2/maintenance', maintenanceRoute);
// app.use('/api/v2/income', incomeRoute);
// app.use('/api/v2/expenses', expensesRoute);
// app.use('/api/v2/note', noteRoute);

// //facility management
// app.use('/api/v2/facility', facilityRoute);

// // complaint tracking
// app.use('/api/v2/complaint', complaintRoute);
// app.use('/api/v2/requests', requestsRoute);

// //security management
// app.use('/api/v2/securityprotocol', securityprotocolRoute);


// // securityGuard
// app.use('/api/v2/security', securityGuardRoute);

// // Annoucement
// app.use('/api/v2/annoucement', annoucementRoute);

// // Secutity 
// app.use('/api/v2/Visitor', visitorRoute);
// app.use('/api/v2/alert', alertRoute);

// // create poll
// app.use('/api/v2/poll', pollRoute);

// // chat 
// app.use('/api/v2/chat', cateRoute);

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO
// const initializeSocket = require('./socketServer');
// initializeSocket(server);

//   app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });

const express = require('express');
const http = require('http'); // Required for integrating with Socket.IO
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

require('./config/db'); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routes
const userRoutes = require('./routes/userRoutes');
const societyRoutes = require('./routes/societyRoutes');
const importantNumberRoutes = require('./routes/importantNumberRoutes');
const residentRoute = require('./routes/residentRoute');
const expensesRoute = require('./routes/expensesRoutes');
const noteRoute = require('./routes/noteRoutes');
const facilityRoute = require('./routes/facilityRoutes');
const complaintRoute = require('./routes/createComplaintRoutes');
const requestsRoute = require('./routes/requestTrackingRoutes');
const securityprotocolRoute = require('./routes/securityProtocolRoutes');
const annoucementRoute = require('./routes/annoucementRoutes');
const securityGuardRoute = require('./routes/securityGuardRoutes');
const incomeRoute = require('./routes/incomeRoutes');
const maintenanceRoute = require('./routes/maintenanceRoutes');
const visitorRoute = require('./routes/visitorRoute');
const alertRoute = require('./routes/alertRoute');
const pollRoute = require('./routes/pollRoutes');
const chatRoute = require('./routes/chatRoute');
const notificationRoutes = require('./routes/notificationRoutes');

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/societies', societyRoutes);
app.use('/api/v2/important-numbers', importantNumberRoutes);
app.use('/api/v2/resident', residentRoute);
app.use('/api/v2/maintenance', maintenanceRoute);
app.use('/api/v2/income', incomeRoute);
app.use('/api/v2/expenses', expensesRoute);
app.use('/api/v2/note', noteRoute);
app.use('/api/v2/facility', facilityRoute);
app.use('/api/v2/complaint', complaintRoute);
app.use('/api/v2/requests', requestsRoute);
app.use('/api/v2/securityprotocol', securityprotocolRoute);
app.use('/api/v2/security', securityGuardRoute);
app.use('/api/v2/annoucement', annoucementRoute);
app.use('/api/v2/Visitor', visitorRoute);
app.use('/api/v2/alert', alertRoute);
app.use('/api/v2/poll', pollRoute);
app.use('/api/v2/chat', chatRoute);
app.use('/api/v2/notifications', notificationRoutes);


const server = http.createServer(app);

const initializeSocket = require('./socketServer');
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
