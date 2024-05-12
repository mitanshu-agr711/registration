const nodemailer = require('nodemailer');
const fs = require('fs').promises;
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
                    pass: 'vocz spsv mtqo wfbx'
                }
            });
            
            const htmlContent = await fs.readFile('src/content/html.html', 'utf-8');
            const info = await transporter.sendMail({
                from: 'teamconatus@gmail.com',
                to: email,
                subject: 'Successfully register',
                html: htmlContent,
            
            });
            console.log('Verification email sent:', info.response);
        } catch (error) {
            console.error("Email error:", error);
            throw new Apierror("404", "Email is not sent");
        }
    }
};

module.exports = emailsent;
