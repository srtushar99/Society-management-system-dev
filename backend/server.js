const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser")

require("./config/db");
require("dotenv").config();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const societyRoutes = require("./routes/societyRoutes");
const importantNumberRoutes = require("./routes/importantNumberRoutes");
const ownerRoute = require("./routes/ownerRoute")
const tenantRoute = require("./routes/tenantRoute")
const expensesRoute = require("./routes/expensesRoutes")
const noteRoute = require("./routes/noteRoutes")
const facilityRoute = require("./routes/facilityRoutes")

//user registration and login schema
app.use("/api/v1",userRoutes);

//create society api
app.use('/api/societies', societyRoutes);

//create Important Number
app.use('/api/v2/important-numbers', importantNumberRoutes);

//resident apis
app.use('/api/v2/Owner', ownerRoute);
app.use('/api/v2/tenant', tenantRoute);

// financial management
app.use('/api/v2/expenses', expensesRoute);
app.use('/api/v2/note', noteRoute);

//facility management
app.use('/api/v2/facility', facilityRoute);
  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });