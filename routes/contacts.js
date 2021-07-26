const contactsRouter = require('express').Router();
const Contact = require('../models/contact');
const emailer = require('../mailer');
const { EMAIL_SENDER } = require('../env');

contactsRouter.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = await Contact.createMessage({
      name,
      email,
      message,
    });
    await emailer.sendMail({
      from: EMAIL_SENDER,
      to: newMessage.email,
      subject: 'Your message has been successfully received !',
      text: 'Thanks for your message, I will take care of it very soon !',
    });
    res.status(200).send(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = contactsRouter;
