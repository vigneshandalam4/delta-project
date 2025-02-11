const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }, // Total amount paid
    paymentStatus: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending",
    },
    razorpay_payment_id: String,  // Razorpay payment ID
    razorpay_order_id: String, // Razorpay order ID
    razorpay_signature: String, // Razorpay signature
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
