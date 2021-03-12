const nodemailer = require("nodemailer")

const sendEmail = async (email, link) => {
  try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
                // user: 'mathieu.dessaint10@gmail.com',
                // pass: 'ght6mdakzz'
            }
        })
        
    
        let info = await transporter.sendMail({
            from: '"Fish&Follow" <no-reply-fish&follow@gmail.com>',
            to: email,
            subject: 'Réinitialisation de mot de passe',
            text: 'Veuillez cliquer sur le lien suivant ou le coller dans votre navigateur pour changer votre mot de passe : ' +
                link + '\n\n',
            html: 'Veuillez cliquer sur le lien suivant ou le coller dans votre navigateur pour changer votre mot de passe : ' +
                link + '\n\n'
        })
        
        console.log('Message sent: %s', info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com> 
  } catch (error) {
    return error
  }
}

module.exports = sendEmail