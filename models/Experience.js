const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company_name: String,
  job_title: String,
  start_date: String,
  end_date: String,
  accomplishments: [String],
});

const Experience = mongoose.model('Experience', ExperienceSchema);

module.exports = Experience;
