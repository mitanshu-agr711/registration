const nodemailer = require('nodemailer');
const Apierror = require('../utils/Apierror');


const emailsent = {
    sendMail: async (email, photoPath) => {
        try {
            console.log("sent")
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'teamconatus@gmail.com',
                    pass: 'zrtx gfan xgjv ywgn'
                }
            });
            const photoPath = 'photo.jpg.png'; 

            const info = await transporter.sendMail({
                from: 'teamconatus@gmail.com',
                to: email,
                subject: 'Successfully register',
                html: `<p>CONGRATULATION YOU SUCCESSFULLY REGISTERED</p>`,
                attachments: [
                    {
                        filename: 'photo.jpg.png', // Change the filename as needed
                        path: photoPath // Provide the path to your photo file
                    }
                ]
            });
            console.log('Verification email sent:', info.response);
        } catch (error) {
            console.error("Email error:", error);
            throw new Apierror("404", "Email is not sent");
        }
    }
};

module.exports = emailsent;
