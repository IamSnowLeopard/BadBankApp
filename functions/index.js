require("dotenv").config(); // Load environment variables from .env file

console.log("Service Account:", process.env.MYAPP_FIREBASE_SERVICE_ACCOUNT); // Add this line to debug

const serviceAccount = JSON.parse(process.env.MYAPP_FIREBASE_SERVICE_ACCOUNT);

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.MYAPP_FIREBASE_DATABASE_URL,
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
