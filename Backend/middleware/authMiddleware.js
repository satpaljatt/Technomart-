import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
    
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
      req.user = await User.findById(decoded.id).select('-password');

      return next();
    }
    catch (error) {
      return res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  }

  // Handle case where no token is provided in the header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); 
  } else {
    res.status(403).json({ message: 'Access denied. Administrators only.' });
  }
};


  export { protect , admin};

