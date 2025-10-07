// backend/routes/jobRoutes.js
import express from 'express';
import { Job } from '../models/AllModels.js'; 
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/jobs - Public: Get all job listings
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

// POST /api/jobs - Protected: Recruiter Only
router.post('/', protect, async (req, res) => {
    try {
        const { title, description, recruiterId } = req.body;
        const newJob = new Job({ title, description, recruiterId });
        await newJob.save();
        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        res.status(400).json({ message: 'Invalid job data' });
    }
});

export default router;