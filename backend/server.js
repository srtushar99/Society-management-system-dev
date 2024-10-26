const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const societyRoutes = require("./routes/societyRoutes");
const importantNumberRoutes = require("./routes/importantNumberRoutes");

app.use('/api/societies', societyRoutes);
app.use("/api/v1",userRoutes);
app.use('/api/important-numbers', importantNumberRoutes);


  
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });