// models/User.js
const mongoose = require('mongoose');
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);