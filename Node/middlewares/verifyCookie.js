require('dotenv').config({ quiet: true });
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const verifyCookie = async (req, res, next) => {
  try {
    // Check cookie first, then Authorization header
    const token = 
      req.cookies.token || 
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    const isExpired = error.name === 'TokenExpiredError';
    if (process.env.NODE_ENV !== 'production') {
      console.error('Auth error:', error.message);
    }
    return res.status(401).json({
      message: isExpired ? 'Token expired' : 'Invalid or expired token',
      expired: isExpired
    });
  }
};

module.exports = verifyCookie;
