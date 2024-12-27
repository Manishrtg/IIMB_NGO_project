document.addEventListener("DOMContentLoaded", function () {
    const donateButton = document.getElementById("donateButton");
    const paymentModal = document.getElementById("paymentModal");
    const closeButton = document.querySelector(".modal .close");
    const donationForm = document.getElementById("payment-form");

    // Open donation modal
    donateButton.addEventListener("click", function () {
        paymentModal.style.display = "flex";
    });

    // Razorpay Payment Gateway Integration
    donationForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission
        
        const name = document.getElementById("donor-name").value;
        const email = document.getElementById("donor-email").value;
        const amount = document.getElementById("donation-amount").value;

        // Create Razorpay Order
        const options = {
            key: 'your-razorpay-key', // Enter your Razorpay key
            amount: amount * 100, // Convert amount to paise
            currency: "INR",
            name: name,
            description: "Donation for School Development",
            handler: function (response) {
                alert("Thank you for your donation! Payment ID: " + response.razorpay_payment_id);
                paymentModal.style.display = "none"; // Close modal
            },
            prefill: {
                name: name,
                email: email,
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    });

    // Close the modal when clicked outside of it
    window.addEventListener("click", function (event) {
        if (event.target == paymentModal) {
            paymentModal.style.display = "none";
        }
    });
});
