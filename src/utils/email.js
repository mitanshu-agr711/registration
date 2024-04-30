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
                    user:  'teamconatus@gmail.com',
                     pass: 'zrtx gfan xgjv ywgn'
                }
            });
            const info = await transporter.sendMail(
                {
                    from: 'teamconatus@gmail.com',
                    to: email,
                    subject: 'Successfully register',
                    html: `<p>CONGRATULATION YOU SUCCESSFULLY REGISTERED</p>`,
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
