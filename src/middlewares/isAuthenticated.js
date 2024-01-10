const { sendResponse, jwt } = require('../utils');

async function isAuthenticated(req, res, next) {
  const authHeader = req.header('Authorization');
  console.log(authHeader,"authenticated");
  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, 401, { tokenExpired: 0 }, 'Failed to Authenticate');
    }
    console.log(token,"tokenn")
    const token = authHeader.split(' ')[1];
    const decoded = jwt.decryptAccessToken(token);

    // if everything is good, save to request for use in other routes
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendResponse(res, 401, { tokenExpired: 1 }, 'Token Expired');
    }
    if (err.name === 'JsonWebTokenError') {
      return sendResponse(res, 401, { tokenExpired: 0 }, 'Corrupt Token');
    }
  }
}

module.exports = isAuthenticated;
