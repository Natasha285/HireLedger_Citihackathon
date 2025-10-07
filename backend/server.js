// backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import credentialRoutes from './routes/credentialRoutes.js';
import jobRoutes from './routes/jobRoutes.js'; 
import { User, Job, Credential } from './models/AllModels.js'; // Will define this next

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURATION ---
const MONGO_URI = 'mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/hireledger?retryWrites=true&w=majority';
// Note: Replace <...> with your actual MongoDB Atlas connection details.

// --- MIDDLEWARE ---
app.use(bodyParser.json());

// Enable CORS for frontend communication (adjust origins for production)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// --- DATABASE CONNECTION ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


// --- ROUTES ---
app.get('/', (req, res) => {
    res.status(200).send('Campus Recruitment Backend API is live.');
});

app.use('/api/credentials', credentialRoutes);
app.use('/api/jobs', jobRoutes);
// TODO: Add app.use('/api/users', userRoutes); for student/recruiter management

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Backend server listening on http://localhost:${PORT}`);
});