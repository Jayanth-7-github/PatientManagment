const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Read token from cookie (set in login and registration)
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
