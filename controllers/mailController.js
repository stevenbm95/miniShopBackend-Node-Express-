const fs = require('fs');
const path = require('path');

const nodemailer = require('nodemailer');
const { log } = require('console');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const sednMasiveEmail =  async (req, res) => {

  const {recipients, subject, text} = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Array.isArray(recipients) ? recipients : [recipients],
      subject,
      text,
    }

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error sending email', error });
  }
}

module.exports = { sednMasiveEmail };