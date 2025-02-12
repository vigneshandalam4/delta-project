const express = require("express");
const router = express.Router();

//footerRoutes - footerRoutes section
router.get("/privacy",(req,res) => {
    res.render("footerRoutes/privacy.ejs");
});

router.get("/terms",(req,res) => {
    res.render("footerRoutes/terms.ejs");
});

router.get("/refunds",(req,res) => {
    res.render("footerRoutes/refund.ejs");
});

router.get("/contactus",(req,res) => {
    res.render("footerRoutes/contact.ejs");
});

router.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New Contact Request:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    req.flash("success","Your message has been received. We'll get back to you soon!");
    res.redirect("/listings");
});


module.exports = router;
