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

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://rahmatmuhammad:t8ViT3z7xood8aHk@mitmern.8xe3obh.mongodb.net/?retryWrites=true&w=majority&appName=MITMERN",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
