const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
    phone: {
        type: String,
        required: true,
        validate: {
          validator: function(value) {
            // Regex for exactly 10 digits
            return /^\d{10}$/.test(value);
          },
          message: 'Phone number must be exactly 10 digits.'
        }
    }
}); 

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);