const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
