const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const cors = require('cors');
app.use(cors()); // Allow all origins for development; adjust for production
// ...

const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

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
// ...
const whitelist = ['https://portfolio-client-bx1rovhrr-hassan-fakihs-projects.vercel.app/',
'https://portfolio-client-azure.vercel.app/','http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the whitelist or if it's not provided (e.g., same-origin requests)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Apply CORS middleware with options
app.use(cors(corsOptions));


const skillsRoutes = require('./routes/skills');
const educationRoutes = require('./routes/educations');
const experienceRoutes = require('./routes/experiences');
const projectsRoutes = require('./routes/projects');

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.use('/api/skills', skillsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectsRoutes);
app.use(upload.single('image')); 
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const uri=process.env.Mongo_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});