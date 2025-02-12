// blocks booked dates and past dates
const today = moment().format('YYYY-MM-DD');

// Example list of booked (blocked) dates
const bookedDates = bookeddates; //ignore error
const blockedDates = bookedDates.map(date => moment(date).format('YYYY-MM-DD'));

// Initialize Flatpickr for check-in field
flatpickr("#checkIn", {
    minDate: today, // Block past dates
    disable: blockedDates, // Block the specified dates
    dateFormat: "Y-m-d"  // Format for the date
});

// Initialize Flatpickr for check-out field
flatpickr("#checkOut", {
    minDate: today, // Block past dates
    disable: blockedDates, // Block the specified dates
    dateFormat: "Y-m-d"  // Format for the date
});

// Form submission validation
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;

    // Check if both fields are empty
    if (!checkIn || !checkOut) {
        event.preventDefault();  // Prevent form submission
        alert('Both check-in and check-out dates must be selected.');
        return;
    }

    // Check if the check-in date is before the check-out date
    if (moment(checkIn).isSameOrAfter(moment(checkOut))) {
        event.preventDefault();  // Prevent form submission
        alert('Check-in date must be before check-out date.');
    }
});