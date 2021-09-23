import mail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

const msg = {
    to: 'santiago.aws@gmail.com',
    from: 'santiago@branding.gq',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
  


mail.setApiKey(process.env.SENDGRID_API_KEY as string)
mail.send(msg).then(() => console.log('Email sent')).catch(console.log)
