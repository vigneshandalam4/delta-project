// utils/mailer.js
const SibApiV3Sdk = require('sib-api-v3-sdk');
const emailTemplate = require("../public/js/mailerEmailTemplate.js");

// Set up the Brevo API client with your API key
const apiKey = process.env.BREVO_API_KEY; // Replace with your Brevo API key
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendContactEmail = async (senderEmail, senderName, message, phone, subject) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = { email: "vigneshandalam4@gmail.com", name: senderName };
    sendSmtpEmail.to = [{ email: 'vigneshandalam1@gmail.com' }];
    
    sendSmtpEmail.subject = `New Message from WanderLust: ${subject}`;
    
    // Get HTML content from the template function
    sendSmtpEmail.htmlContent = emailTemplate(senderName, senderEmail, phone, subject, message);
  
    try {
        const response = await emailApi.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully!', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendContactEmail };
