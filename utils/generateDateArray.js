function generateDateArray(checkIn, checkOut) {
    let dateArray = [];
    let currentDate = new Date(checkIn);
    let endDate = new Date(checkOut);

    // Loop through all the days between checkIn and checkOut
    while (currentDate <= endDate) {
        // Add the current date to the array (formatted as YYYY-MM-DD)
        dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
        
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}

module.exports = generateDateArray;
