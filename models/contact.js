const db = require('../db');

const createMessage = async ({ name, email, message }) => {
  return db.contact.create({
    data: { name, email, message },
  });
};

module.exports = {
  createMessage,
};
