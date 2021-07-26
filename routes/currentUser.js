const currentUserRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

currentUserRouter.get(
  '/',
  requireCurrentUser,
  asyncHandler(async (req, res) => {
    const { email, password, id } = req.currentUser;
    res.json({ email, password, id });
  })
);

module.exports = currentUserRouter;
