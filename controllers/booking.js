const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const Razorpay = require("razorpay");
const moment = require("moment");
const User = require("../models/user.js");
const { validatePaymentVerification } = require('../utils/razorpay-utils');
const generateDateArray = require('../utils/generateDateArray.js'); 

// Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.renderBookingForm = async(req,res) => {
    let {id} =req.params;
    const listing = await Listing.findById(id);

    const bookedDates = listing.bookedDates;
    res.render("bookings/booking.ejs",{ listing, bookedDates });
}

module.exports.sendOrderAndRenderConfirmpage = async (req, res) => {
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
    // Calculate amount with GST and convert to paise
    //amount
    let amount = nights * pricePerNight; 
    amount = Math.round(amount * 1.18 * 100); // Apply 18% GST and convert to paise
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
            res.render("bookings/confirmpayment.ejs",{ orderData, user, key_id: process.env.RAZORPAY_KEY_ID, listing, booking });
        }
    });
    // res.send("working");
}

module.exports.confirmPaymentAndSaveInDb = async (req, res) => {
    // Get listing by id
    const { id } = req.params;
    const listing = await Listing.findById(id);

    // Get user by req.user
    const user = await User.findById(req.user._id);

    const { order_id, payment_id, signature, amount, checkIn, checkOut } = req.body;

    // Validate payment using the utility function sha256
    // validates whether signature is correct or not
    const isVerified = validatePaymentVerification(
        { order_id, payment_id },
        signature,
        process.env.RAZORPAY_KEY_SECRET
    );

    if(isVerified){
        // Log payment verification success
        console.log("Payment verification successful!");

        // Create a new booking document in MongoDB
        const newBooking = new Booking({
            user: req.user._id,            // Current logged-in user's ID
            listing: listing._id,          // Listing ID from URL
            checkIn: checkIn,    // Convert to Date if needed
            checkOut: checkOut,  // Convert to Date if needed
            amount: amount,                        // Total amount paid (now coming from the request body)
            paymentStatus: "Success",      // Update payment status to "Success"
            razorpay_payment_id: payment_id, 
            razorpay_order_id: order_id, 
            razorpay_signature: signature,
        });

        // Save the new booking to the database
        const savedBooking = await newBooking.save();

        // Update the Listing model
        await Listing.findByIdAndUpdate(id, {
            $push: { bookings: savedBooking._id } // Assuming `bookings` is an array field in Listing
        });

        // Update the User model
        await User.findByIdAndUpdate(req.user._id, {
            $push: { bookings: savedBooking._id } // Assuming `bookings` is an array field in User
        });

        // Generate the booked dates array from checkIn and checkOut
        const dates = generateDateArray(checkIn, checkOut);

        // Update the Listing model to include the booked dates
        await Listing.findByIdAndUpdate(id, {
            $push: { bookedDates: { $each: dates } }  // Adds multiple dates to the bookedDates array
        });

        // Redirect to listings page after successful booking
        req.flash("success", "Booking confirmed and payment successful!");
        res.redirect("/listings"); // Adjust the redirect URL based on your application structure

    } else {
        // Log payment verification failure
        req.flash("error", "Payment verification failed");
        res.redirect("/listings"); // Adjust the redirect URL based on your application structure
    }
}