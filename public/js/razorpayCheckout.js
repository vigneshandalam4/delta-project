document.addEventListener("DOMContentLoaded", function () {
    const options = {
        "key": key_id, 
        "amount": amount, 
        "currency": "INR",
        "name": "WanderLust Private Limited",
        "description": "Payment for your WanderLust booking",
        "image": "https://res.cloudinary.com/dxnqvqj0z/image/upload/v1739366635/w17bhcfqhcb9tvypzqr4.png",
        "order_id": order_id,
        "handler": function (response) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/listings/${listing_id}/book/paymentsuccess`;

            // Adding inputs
            form.appendChild(createHiddenInput('order_id', order_id));
            form.appendChild(createHiddenInput('payment_id', response.razorpay_payment_id));
            form.appendChild(createHiddenInput('signature', response.razorpay_signature));
            form.appendChild(createHiddenInput('amount', amount));
            form.appendChild(createHiddenInput('checkIn', checkIn));
            form.appendChild(createHiddenInput('checkOut', checkOut));

            document.body.appendChild(form);
            form.submit();
        },
        "prefill": {
            "name": username,
            "email": email,
            "contact": contact
        },
        "notes": {
            "address": "WanderLust Private Limited"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/listings/${listing_id}/book/paymentfailure`;

        form.appendChild(createHiddenInput('order_id', order_id));
        form.appendChild(createHiddenInput('payment_id', response.error.metadata.payment_id));
        form.appendChild(createHiddenInput('amount', amount));
        form.appendChild(createHiddenInput('checkIn', checkIn));
        form.appendChild(createHiddenInput('checkOut', checkOut));
        form.appendChild(createHiddenInput('userId', user_id));

        document.body.appendChild(form);
        form.submit();
    });

    document.getElementById('rzp-button1').addEventListener("click", function (e) {
        rzp1.open();
        e.preventDefault();
    });

    // Function to create hidden input fields
    function createHiddenInput(name, value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        return input;
    }
});
