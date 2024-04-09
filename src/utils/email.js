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
                    user: 'av3497924@gmail.com',
                    pass: 'rgde ckue yury gail'
                }
            });

            const mail = {
                from: 'mitanshuagrawal5@gmail.com',
                to: email,
                subject: 'Successfully register',
                html: `<p>CONGRATULATION YOUR SUCCESSFULLY REGISTER</p>`,
            };

            const info = await transporter.sendMail(mail);
            console.log('Verification email sent:', info.response);
        }
         catch (error) {
            console.error("Email error:", error);
            throw new Apierror("404", "Email is not sent");
        }
    }
};

module.exports = emailsent;
