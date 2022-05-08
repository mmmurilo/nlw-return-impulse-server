"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8e3b2ae954f606",
        pass: "5230342f675456"
    }
});
class NodemailerMailAdapter {
    async sendMail({ subject, body }) {
        transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Murilo Bartel <mmmurilo1996@gmail.com>',
            subject: subject,
            html: body,
        });
    }
}
exports.NodemailerMailAdapter = NodemailerMailAdapter;
