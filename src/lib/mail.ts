import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

type MailOptions = {
    to: string;
    subject: string;
    html: string;
};

export async function sendMail({ to, subject, html }: MailOptions) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"AEP Contact" <no-reply@aepbr.org.br>',
            to,
            subject,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
