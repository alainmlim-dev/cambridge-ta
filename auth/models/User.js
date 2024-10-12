// models/User.js
const mongoose = require('mongoose');
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)

const articleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true }
}, { collection: 'articles' });

module.exports = mongoose.model('User', articleSchema);