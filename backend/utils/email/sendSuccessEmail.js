const nodemailer = require("nodemailer")

const sendEmail = async (email) => {
  try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        
    
        let info = await transporter.sendMail({
            from: '"Fish & Follow"',
            to: email,
            subject: 'Confirmation de changement de mot de passe',
            text: 'Votre changement de mot de passe a bien été pris en compte.',
            html: 'Votre changement de mot de passe a bien été pris en compte.' 
        })
        
        console.log('Message sent: %s', info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com> 
  } catch (error) {
    return error
  }
}

module.exports = sendEmail