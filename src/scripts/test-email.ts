
import nodemailer from 'nodemailer';
import { env } from 'process';

// Load environment variables if not already loaded (bun does this automatically)

async function testEmail() {
    console.log("--- Email Configuration Test ---");

    const host = env.SMTP_HOST;
    const port = Number(env.SMTP_PORT);
    const secure = env.SMTP_SECURE === 'true'; // Should be true for 465
    const user = env.SMTP_USER;
    const pass = env.SMTP_PASSWORD ? '******' : 'MISSING';
    const from = env.SMTP_FROM;
    const to = env.CONTACT_EMAIL;

    console.log(`Host: ${host}`);
    console.log(`Port: ${port}`);
    console.log(`Secure: ${secure}`);
    console.log(`User: ${user}`);
    console.log(`Pass: ${pass}`);
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);

    if (!host || !user || !env.SMTP_PASSWORD) {
        console.error("❌ Missing required environment variables.");
        process.exit(1);
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
            user,
            pass: env.SMTP_PASSWORD,
        },
        debug: true, // Enable debug output
        logger: true, // Log to console
    });

    try {
        console.log("\nAttempting to verify connection...");
        await transporter.verify();
        console.log("✅ Connection verified successfully.");

        console.log("\nAttempting to send test email...");
        const info = await transporter.sendMail({
            from: from || user,
            to: to || user, // Fallback to sending to self
            subject: "Test Email from AEP Landing",
            text: "This is a test email to verify SMTP configuration.",
            html: "<p>This is a <b>test email</b> to verify SMTP configuration.</p>",
        });

        console.log("✅ Email sent successfully.");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);

    } catch (error) {
        console.error("\n❌ Error:");
        console.error(error);
    }
}

testEmail().catch(console.error);
