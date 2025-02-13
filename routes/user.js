const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn, isAdmin } = require("../middleware.js");
const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

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

// Profile Route
router.get('/profile', isLoggedIn, wrapAsync( userController.profile ));

//dashboard
router.get('/dashboard', isAdmin, wrapAsync(async (req, res) => {
    const users = await User.find().populate("bookings"); 
    const bookings = await Booking.find().populate("user").populate("listing");
    const listings = await Listing.find().populate("owner");

    res.render("dashboard", { users, bookings, listings });
}));

module.exports = router;
