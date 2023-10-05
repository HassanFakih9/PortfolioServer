const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  graduation_date: Date,
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
