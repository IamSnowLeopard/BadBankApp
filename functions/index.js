const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Parse the service account JSON string
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Import your server file
const server = require("./backend/server");

// Use the Express app from your server file
app.use(server);

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
