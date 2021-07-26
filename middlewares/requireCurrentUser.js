const User = require('../models/user');

module.exports = async (req, res, next) => {
  const { userId } = req.session;
  try {
    req.currentUser = await User.findOne(userId);
  } catch (err) {
    return res.sendStatus(401);
  }
  return next();
};
