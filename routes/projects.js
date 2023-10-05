const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Create a new record
router.post('/', async (req, res) => {
  try {
    const newProject = new Project({
      name: req.body.name,
      description: req.body.description,
      technologies_used: req.body.technologies_used || [],
      links: req.body.links || [],
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project record' });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project records' });
  }
});

// Get a single record
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project record not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project record' });
  }
});

// Update a record
router.put('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        technologies_used: req.body.technologies_used || [],
        links: req.body.links || [],
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project record not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project record' });
  }
});

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project record not found' });
    }
    res.status(200).json({ message: 'Project record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project record' });
  }
});

module.exports = router;
