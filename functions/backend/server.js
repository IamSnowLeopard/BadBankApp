const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: true }));
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

// Routes
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
