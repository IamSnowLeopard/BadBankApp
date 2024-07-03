const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize express app
const app = express();

// Middleware
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

const uri = functions.config().mongodb.uri;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Import routes
const authRoutes = require("./backend/routes/auth");
const userRoutes = require("./backend/routes/user");
const transactionRoutes = require("./backend/routes/transactions");
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/transactions", transactionRoutes);

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
