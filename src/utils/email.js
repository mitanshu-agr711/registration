const nodemailer = require('nodemailer');
const Apierror = require('../utils/Apierror');

const emailsent = {
    sendMail: async (email) => {
        try {
            console.log("sent")
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'mitanshuagrawal5@gmail.com',
                     pass: 'bmvgvzycgbdbkerj'
                }
            });
            const info = await transporter.sendMail(
                {
                    from: 'mitanshuagrawal5@gmail.com',
                    to: email,
                    subject: 'Successfully register',
                    html: `<p>CONGRATULATION You SUCCESSFULLY REGISTERED</p>`,
                }
            );
            console.log(info);
            console.log('Verification email sent:', info.response);
        }
         catch (error) {
            console.error("Email error:", error);
            throw new Apierror("404", "Email is not sent");
        }
    }
};

module.exports = emailsent;
