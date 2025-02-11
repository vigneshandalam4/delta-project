const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const Razorpay = require("razorpay");
const moment = require("moment");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");


// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//render booking.ejs
router.get("/listings/:id/book",wrapAsync(async(req,res) => {
    let {id} =req.params;
    const listing = await Listing.findById(id);

    const bookedDates = ["2025-02-15", "2025-02-16", "2025-02-17"];
    res.render("bookings/booking.ejs",{ listing, bookedDates });
}));

//send order from your server calculate prices and render confirmpayment.ejs
router.post("/listings/:id/book", wrapAsync(async (req, res) => {
    //get listing by id
    let {id} =req.params;
    const listing = await Listing.findById(id);
    // console.log(listing);

    //get user by req.user
    const user = await User.findById(req.user._id);
    // console.log(user);

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

    //send order from your server and get order id
    razorpay.orders.create({
        amount: amount, // Convert INR to paisa (5000 INR = 500000 paisa)
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
    }, (err, order) => {
        if (err) {
            // Return error response only once
            if (!res.headersSent) {
                return res.status(500).json({ error: err });
            }
        }
    
        // Prepare the data to send all in one response
        const orderData = {
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        };
    
        // Send the response only once
        if (!res.headersSent) {
            res.render("bookings/confirmpayment.ejs",{ orderData });
        }
    });
    
        
    // res.send("working");
}));



module.exports = router;
