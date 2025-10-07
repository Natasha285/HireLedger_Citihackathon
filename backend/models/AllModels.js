// backend/models/AllModels.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// --- 1. User Schema (Students, Recruiters, Admins) ---
const userSchema = new Schema({
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
    name: { type: String, required: true },
    // Add other profile fields...
}, { timestamps: true });

// --- 2. Job Schema ---
const jobSchema = new new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    recruiterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String },
    // Add applicationDeadline, skillsRequired...
}, { timestamps: true });

// --- 3. Credential Schema ---
const credentialSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    issuerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    credentialHash: { type: String, required: true, unique: true }, // The hash stored on the blockchain
    txHash: { type: String, unique: true }, // Blockchain transaction ID
    isVerified: { type: Boolean, default: false },
    metadata: { type: Object }, // Course name, grade, etc.
    // Add blockchainAddress: { type: String }...
}, { timestamps: true });


export const User = mongoose.model('User', userSchema);
export const Job = mongoose.model('Job', jobSchema);
export const Credential = mongoose.model('Credential', credentialSchema);