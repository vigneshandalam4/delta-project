// routes/contact.js
const express = require("express");
const router = express.Router();
const { sendContactEmail } = require('../utils/mailer');
const wrapAsync = require("../utils/wrapAsync.js");

// Footer Routes
router.get("/privacy", (req, res) => {
    res.render("footerRoutes/privacy.ejs");
});

router.get("/terms", (req, res) => {
    res.render("footerRoutes/terms.ejs");
});

router.get("/refunds", (req, res) => {
    res.render("footerRoutes/refund.ejs");
});

router.get("/contactus", (req, res) => {
    res.render("footerRoutes/contact.ejs");
});

// Route to handle form submission
router.post('/contact', wrapAsync(async (req, res) => {
    const { name, email, message, phone, subject } = req.body;

    // Validate the input
    if (!name || !email || !message) {
        req.flash("error", "All Fields are required!");
        return res.redirect("/contactus");
    }

    // Send the email
    let response = await sendContactEmail(email, name, message, phone, subject);

    if(response){
        // Send success response
        req.flash("success", "Your message has been received. We'll get back to you soon!");
        res.redirect("/listings");
    }else{
        req.flash("error", "Error! Your message wasn't sent!");
        res.redirect("/listings");
    }

    
}));

module.exports = router;
