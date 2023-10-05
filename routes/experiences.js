const express = require('express');
const Experience = require('../models/Experience');

const router = express.Router();

// Create a new record
router.post('/', async (req, res) => {
  try {
    const newExperience = new Experience({
      company_name: req.body.company_name,
      job_title: req.body.job_title,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      accomplishments: req.body.accomplishments || [],
    });

    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create experience record' });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve experience records' });
  }
});

// Get a single record
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience record not found' });
    }
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve experience record' });
  }
});

// Update a record
router.put('/:id', async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        company_name: req.body.company_name,
        job_title: req.body.job_title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        accomplishments: req.body.accomplishments || [],
      },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ error: 'Experience record not found' });
    }
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience record' });
  }
});

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);

    if (!deletedExperience) {
      return res.status(404).json({ error: 'Experience record not found' });
    }
    res.status(200).json({ message: 'Experience record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience record' });
  }
});

module.exports = router;
