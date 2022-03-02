// Requirements
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// security
require("dotenv").config({ path: process.cwd() + "/.env" });
const rateLimit = require("express-rate-limit");

// routes
const rteSauces = require("./routes/rteSauces");
const rteUsers = require("./routes/rteUsers");

// start the express app
const app = express();
app.use(cors());

// Link to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Request parsing
app.use(bodyParser.json());

// Limit amount of request done
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Routes settings
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", rteSauces);
app.use("/api/auth", rteUsers);

module.exports = app;
