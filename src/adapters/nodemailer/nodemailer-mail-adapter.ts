import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8e3b2ae954f606",
        pass: "5230342f675456"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {

        transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Murilo Bartel <mmmurilo1996@gmail.com>',
            subject: subject,
            html: body,
        })
    }
}