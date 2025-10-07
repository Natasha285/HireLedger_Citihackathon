// backend/middleware/authMiddleware.js
// NOTE: This is a placeholder. You must replace this with actual Firebase Admin SDK logic.
const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Placeholder: Get token from header
            token = req.headers.authorization.split(' ')[1];
            
            // **TODO: REAL IMPLEMENTATION HERE**
            // 1. Use Firebase Admin SDK to verify token:
            // const decodedToken = await admin.auth().verifyIdToken(token);
            // req.user = decodedToken;
            
            // For now, assume a token exists and is valid.
            console.log('Token received. Proceeding...');
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;