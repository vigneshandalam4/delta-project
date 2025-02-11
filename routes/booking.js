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
    // console.log(id);
    const listing = await Listing.findById(id);
    res.render("bookings/booking.ejs",{ listing });
}));

router.post("/listings/:id/book", wrapAsync(async (req, res) => {
    //get listing by id
    let {id} =req.params;
    const listing = await Listing.findById(id);

    //get user by req.user
    res.send(req.user._id);

    //get checkin and checkout dates from req.body
    const { booking } = req.body;

    //take checkin and checkout date 
    const checkInDate = moment(booking.checkIn, 'YYYY-MM-DD');
    const checkOutDate = moment(booking.checkOut, 'YYYY-MM-DD');
    //calculate price per night
    const pricePerNight = listing.price;
    const nights = checkOutDate.diff(checkInDate, 'days');
    const amount = nights * pricePerNight;//amount
    // console.log(`Total price for ${nights} nights: ₹${amount}`);
}));



module.exports = router;
