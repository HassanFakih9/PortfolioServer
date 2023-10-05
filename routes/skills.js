const express = require('express');
const Skill = require('../models/Skill');

const router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Create a directory to store uploaded images
const uploadDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });


const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage :storage});

// Define a POST route for creating a skill with an associated image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, level, description } = req.body;
    const imageFilename = req.file.filename; // Get the uploaded image's filename

    // Create a new skill object with the image filename
    const newSkill = new Skill({
      name,
      level,
      description,
      image: imageFilename, // Store the image filename
    });

    // Save the skill object to the database
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create skill record' });
  }
});




// GET all records with image URLs
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    const skillsWithImageURLs = skills.map(skill => ({
      _id: skill._id,
      name: skill.name,
      level: skill.level,
      description: skill.description,
      image: skill.image, // Include the image URL
    }));
    res.status(200).json(skillsWithImageURLs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve skill records' });
  }
});

// GET an individual record with image URL
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill record not found' });
    }
    res.status(200).json({
      _id: skill._id,
      name: skill.name,
      level: skill.level,
      description: skill.description,
      image: skill.image, // Include the image URL
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve skill record' });
  }
});

// PUT route to update a skill
router.put('/:id', async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        level: req.body.level,
        description: req.body.description,
        image: req.body.image, // Update the image URL if needed
      },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ error: 'Skill record not found' });
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill record' });
  }
});

// DELETE a skill with its image
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

    if (!deletedSkill) {
      return res.status(404).json({ error: 'Skill record not found' });
    }

    // Optionally, you can delete the associated image file from the server
    if (deletedSkill.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', deletedSkill.image);
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: 'Skill record and image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill record' });
  }
});

module.exports = router;


module.exports = router;




// just comments:
// ///////////
// const express = require('express');
// const path = require('path');

// const app = express();

// // Define a route to serve images
// app.get('/images/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const imagePath = path.join(__dirname, 'your-image-directory', filename); // Replace 'your-image-directory' with the actual path
//   res.sendFile(imagePath);
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

