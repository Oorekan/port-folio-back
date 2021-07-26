const db = require('../db');

const findByEmail = (email) => {
  return db.user.findFirst({ where: { email } });
};

const findOne = (id) => db.user.findUnique({ where: { id } });

const { findMany } = db.user;

module.exports = {
  findByEmail,
  findOne,
  findMany,
};
