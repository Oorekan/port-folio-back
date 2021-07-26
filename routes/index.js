const contactsRouter = require('./contacts');
const projectsRouter = require('./projects');
const authRouter = require('./auth');
const currentUserRouter = require('./currentUser');

module.exports = (app) => {
  app.use('/contacts', contactsRouter);
  app.use('/projects', projectsRouter);
  app.use('/auth', authRouter);
  app.use('/currentUser', currentUserRouter);
};
