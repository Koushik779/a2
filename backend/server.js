import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://hkoushik058_db_user:b2gPnQTvtw3bqnyD@cluster0.vuvidzz.mongodb.net/developer-directory?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Full-Stack']
  },
  techStack: {
    type: [String],
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Developer = mongoose.model('Developer', developerSchema);

app.post('/developers', async (req, res) => {
  try {
    const { name, role, techStack, experience } = req.body;

    if (!name || !role || !techStack || experience === undefined) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    const techStackArray = Array.isArray(techStack)
      ? techStack
      : techStack.split(',').map(tech => tech.trim()).filter(tech => tech);

    if (techStackArray.length === 0) {
      return res.status(400).json({
        error: 'At least one technology is required'
      });
    }

    const developer = new Developer({
      name,
      role,
      techStack: techStackArray,
      experience: Number(experience)
    });

    await developer.save();

    res.status(201).json({
      message: 'Developer added successfully',
      developer
    });
  } catch (error) {
    console.error('Error saving developer:', error);
    res.status(500).json({
      error: 'Failed to save developer'
    });
  }
});

app.get('/developers', async (req, res) => {
  try {
    const { role, tech } = req.query;

    let query = {};

    if (role) {
      query.role = role;
    }

    if (tech) {
      query.techStack = { $regex: tech, $options: 'i' };
    }

    const developers = await Developer.find(query).sort({ createdAt: -1 });

    res.json(developers);
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).json({
      error: 'Failed to fetch developers'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
