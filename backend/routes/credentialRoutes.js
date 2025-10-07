// backend/routes/credentialRoutes.js
import express from 'express';
import { Credential } from '../models/AllModels.js';
import protect from '../middleware/authMiddleware.js'; // Will define this next

const router = express.Router();

// Mock Web3/Ethers setup (replace with actual blockchain integration later)
const mockBlockchainService = {
    // Simulates calling the Smart Contract's issue function
    issueCredentialOnChain: (hash) => ({ txHash: `0xBC${Date.now()}...`, onChainHash: hash }),
    // Simulates calling the Smart Contract's verify function
    verifyCredentialOnChain: (credentialId) => ({ hash: '0x123...456', status: 'VERIFIED' }) 
};

// POST /api/credentials/issue - Protected: Admin/University Only
router.post('/issue', protect, async (req, res) => {
    try {
        const { studentId, issuerId, credentialHash, metadata } = req.body;

        // 1. Simulate Hashing (In a real app, this hashing happens carefully)
        // const dataHash = calculateSHA256(metadata); 

        // 2. Interact with Smart Contract
        const blockchainData = mockBlockchainService.issueCredentialOnChain(credentialHash);

        // 3. Save Record to MongoDB
        const credential = new Credential({
            studentId,
            issuerId,
            credentialHash,
            txHash: blockchainData.txHash,
            isVerified: true,
            issuedDate: new Date()
        });
        await credential.save();

        res.status(201).json({ message: 'Credential issued and recorded.', credential, blockchainData });
    } catch (error) {
        res.status(500).json({ message: 'Error issuing credential', error: error.message });
    }
});

// GET /api/credentials/verify/:id - Public
router.get('/verify/:id', async (req, res) => {
    try {
        const credential = await Credential.findById(req.params.id);

        if (!credential) {
            return res.status(404).json({ message: 'Credential not found.' });
        }

        // 1. Interact with Smart Contract to verify
        const verificationResult = mockBlockchainService.verifyCredentialOnChain(credential._id);

        // 2. Compare on-chain data with DB data and return result
        res.status(200).json({
            message: 'Verification complete.',
            credential,
            onChainStatus: verificationResult.status,
            match: credential.credentialHash === verificationResult.hash // Real verification logic
        });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying credential', error: error.message });
    }
});

export default router;