const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const Booking = require("../models/booking.js");

//user controller
const userController = require("../controllers/user.js");


//signup routes
router.route("/signup")
    .get( userController.renderSignupForm )
    .post( wrapAsync( userController.signup ));

// router.get("/signup", userController.renderSignupForm );

// router.post("/signup", wrapAsync( userController.signup ));

//login routes
router.route("/login")
    .get( userController.renderLoginForm )
    .post( saveRedirectUrl ,
        passport.authenticate( "local", { failureRedirect: "/login", failureFlash: true } ) , 
        userController.login 
    );

// router.get("/login", userController.renderLoginForm );

// router.post("/login", saveRedirectUrl ,
//     passport.authenticate( "local", { failureRedirect: "/login", failureFlash: true } ) , 
//     userController.login 
// );

//logout route
router.get("/logout", userController.logout );

//miscellaneous - footer section
router.get("/privacy",(req,res) => {
    res.render("miscellaneous/privacy.ejs");
});

router.get("/terms",(req,res) => {
    res.render("miscellaneous/terms.ejs");
});

// Profile Route
router.get('/profile', isLoggedIn, wrapAsync(async(req, res) => {
    // Find the user by ID and populate the 'bookings' field and 'listing' in each booking
    const user = await User.findById(req.user._id)
        .populate({
            path: 'bookings',
            populate: {
                path: 'listing',  // This assumes 'listing' is a reference field in your Booking model
                model: 'Listing'  // Make sure to replace 'Listing' with the actual model name for listings if different
            }
        });

    // console.log(user.bookings); // Log bookings to check the populated data

    // Render the profile page with the user and bookings data
    res.render('miscellaneous/profile.ejs', { user });
}));


router.get("/refunds",(req,res) => {
    res.render("miscellaneous/refund.ejs");
});

router.get("/contactus",(req,res) => {
    res.render("miscellaneous/contact.ejs");
});

router.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`New Contact Request:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    req.flash("success","Your message has been received. We'll get back to you soon!");
    res.redirect("/listings");
});


module.exports = router;
