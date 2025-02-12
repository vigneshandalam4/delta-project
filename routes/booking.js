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
router.post('/listings/:id/book/paymentfailure', wrapAsync( bookingController.paymenFailuretAndSaveInDb ));


module.exports = router;
