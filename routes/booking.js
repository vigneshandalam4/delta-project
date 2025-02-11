const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const Razorpay = require("razorpay");
const moment = require("moment");
const wrapAsync = require("../utils/wrapAsync.js");

// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.get("/listings/:id/book",wrapAsync(async(req,res) => {
    let {id} =req.params;
    console.log(id);
    const listing = await Listing.findById(id);
    res.render("bookings/booking.ejs",{ listing });
}));

module.exports = router;
