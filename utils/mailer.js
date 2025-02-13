// utils/mailer.js
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Set up the Brevo API client with your API key
const apiKey = process.env.BREVO_API_KEY; // Replace with your Brevo API key
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendContactEmail = async (senderEmail, senderName, message, phone, subject) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = { email: "vigneshandalam4@gmail.com", name: senderName };
    sendSmtpEmail.to = [{ email: 'vigneshandalam1@gmail.com' }];
    
    sendSmtpEmail.subject = `New Message from WanderLust: ${subject}`;
    
    sendSmtpEmail.htmlContent = `
    <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <h1 style="color: #333;">You have a new message from ${senderName}</h1>
                <p style="font-size: 16px;">Here are the details:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #555; width: 25%;">Sender's Name:</td>
                        <td style="padding: 10px;">${senderName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #555;">Sender's Email:</td>
                        <td style="padding: 10px;">${senderEmail}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #555;">Phone Number:</td>
                        <td style="padding: 10px;">${phone || 'Not Provided'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #555;">Message Subject:</td>
                        <td style="padding: 10px;">${subject}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #555;">Message:</td>
                        <td style="padding: 10px;">${message}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px; font-size: 14px; color: #777;">Thank you for contacting us!</p>
            </div>
        </body>
    </html>`;
  
    try {
        const response = await emailApi.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendContactEmail };
