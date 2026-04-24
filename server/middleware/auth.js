const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET || 'alba_secret_key');
    if (!verified) {
      return res.status(401).json({ message: 'Token verification failed, access denied' });
    }

    req.user = verified.id;
    req.role = verified.role;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const adminAuth = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

module.exports = { auth, adminAuth };
