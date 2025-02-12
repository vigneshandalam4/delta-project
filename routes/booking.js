const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const Razorpay = require("razorpay");
const moment = require("moment");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const { validatePaymentVerification } = require('../utils/razorpay-utils');
const generateDateArray = require('../utils/generateDateArray.js'); 
//booking controller
const bookingController = require("../controllers/booking.js");

// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//render booking.ejs
router.get("/listings/:id/book",wrapAsync( bookingController.renderBookingForm ));

//send order from your server calculate prices and render confirmpayment.ejs
router.post("/listings/:id/book", wrapAsync( bookingController.sendOrderAndRenderConfirmpage ));

//confirm payment and save all details in booking, listing, and user
router.post("/listings/:id/book/paymentsucess", wrapAsync( bookingController.confirmPaymentAndSaveInDb ));

//on paymentfailure
router.post('/listings/:id/book/paymentfailure', wrapAsync(async (req, res) => {
    const { order_id, payment_id, amount, checkIn, checkOut, userId } = req.body;

    // Get listing by id
    const { id } = req.params;
    const listing = await Listing.findById(id);
    
    // Create a new booking with failed status
    const newBooking = new Booking({        
        user: userId,
        user: req.user._id,   // Current logged-in user's ID
        listing: listing._id,  // Listing ID from URL
        checkIn: checkIn,    // Convert to Date if needed
        checkOut: checkOut,  // Convert to Date if needed
        amount: amount,     // Total amount paid (now coming from the request body)
        paymentStatus: "Failed",  // Update payment status to "Success"
        razorpay_payment_id: payment_id, 
        razorpay_order_id: order_id, 
        razorpay_signature: "N/A",
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    // Update the User model
    await User.findByIdAndUpdate(req.user._id, {
        $push: { bookings: savedBooking._id } // Assuming `bookings` is an array field in User
    });

    req.flash("error", "Booking Failed and Payment Failed");
    res.redirect("/listings"); // Adjust the redirect URL based on your application structure
}));


module.exports = router;
