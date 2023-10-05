const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
  image: String,



});

module.exports = mongoose.model('Skill', skillSchema);

