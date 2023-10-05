const express = require('express');
const Education = require('../models/Education');

const router = express.Router();

// Create a new record
router.post('/', async (req, res) => {
  try {
    const newEducation = new Education({
      institution: req.body.institution,
      degree: req.body.degree,
      graduation_date: req.body.graduation_date,
    });

    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create education record' });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve education records' });
  }
});

// Get a single record
router.get('/:id', async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve education record' });
  }
});

// Update a record
router.put('/:id', async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      {
        institution: req.body.institution,
        degree: req.body.degree,
        graduation_date: req.body.graduation_date,
      },
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update education record' });
  }
});

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);

    if (!deletedEducation) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    res.status(200).json({ message: 'Education record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete education record' });
  }
});

module.exports = router;
