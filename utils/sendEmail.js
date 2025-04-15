const dotenv = require('dotenv');
dotenv.config(); // ✅ This loads .env variables here

const nodemailer = require('nodemailer');

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: true,
});

const sendConfirmationEmail = async (note) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Note Created Successfully',
        text: `Your note titled '${note.title}' was created.`,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Email error:', error);
    }
};

module.exports = sendConfirmationEmail;
