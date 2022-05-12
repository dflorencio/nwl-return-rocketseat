import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../mail-adapter";



const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8b28ab2617ce73",
      pass: "0e070ef88b3187"
    }
  });



export class NodeMailerAdapter implements MailAdapter{
    async sendMail({subject, body}: sendMailData){
        await transport.sendMail({
            from: 'Equipe feedget <oi@feedget.com>',
            to: 'Diego Fernandes <davi_florencio@hotmail.com',
            subject,
            html: body,
        });
    }
}