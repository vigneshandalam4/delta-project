const crypto = require("crypto");

const validatePaymentVerification = (paymentData, signature, secret) => {
    const hmac = crypto.createHmac("sha256", secret);
    const data = paymentData.order_id + "|" + paymentData.payment_id;
    hmac.update(data);
    const generatedSignature = hmac.digest("hex");
    
    return generatedSignature === signature; // Returns true if signatures match
};

module.exports = { validatePaymentVerification };
