window.addEventListener('load', async () => {
    try {
        const response = await fetch("/api/v1/timezones");

        if (!response.ok) {
            throw new Error("Failed to fetch time zones");
        }

        const timeZones = await response.json();
        const select = document.getElementById("timeZone");

        select.innerHTML = '<option value="">Select Time Zone</option>';

        timeZones.forEach(zone => {
            select.add(new Option(zone, zone));
        });

    } catch (error) {
        console.error(error);
    }
});


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", registerUser);

});

async function registerUser(event) {

    event.preventDefault();
    const responseError = document.getElementById("responseError");
    responseError.innerHTML = "";

    if (!validateForm()) {
        return;
    }

  /*  const csrfToken = document
        .querySelector('meta[name="_csrf"]')
        .getAttribute("content");

    const csrfHeader = document
        .querySelector('meta[name="_csrf_header"]')
        .getAttribute("content"); */

    const user = {

        emailId: document.getElementById("email").value,

        password: document.getElementById("password").value,

        confirmPassword: document.getElementById("confirmPassword").value,

        gender: document.getElementById("gender").value,

        firstName: document.getElementById("firstName").value,

        lastName: document.getElementById("lastName").value,

        mobileNo: document.getElementById("mobileNo").value,

        timezone: document.getElementById("timeZone").value
    };

    try {


        const response = await fetch("http://localhost:1000/api/v1/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
              //  [csrfHeader]: csrfToken
            },

            body: JSON.stringify(user)

        });

        if (response.ok) {



            window.location.href = "/login?success";

        } else {

            const error = await response.json();

            console.error(error.reason);
            if (!undefined){
                responseError.innerHTML = error.reason;
				
				responseError.classList.add("text-danger", "fw-bold");
				}
        }

    } catch (err) {

        console.error(err);
        responseError.innerHTML = "Unable to connect to server...";
		responseError.classList.add("text-danger", "fw-bold");

    }

}


function validateForm() {



    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    // Email validation (simple regex)
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.innerHTML = "Invalid email format";
        return false;
    }

    // Password match validation
    if (password !== confirmPassword) {
        passwordError.innerHTML = "Passwords do not match";
        return false;
    }

    // Optional: password strength check
    if (password.length < 6) {
        passwordError.innerHTML = "Password must be at least 6 characters";
        return false;
    }

    return true; // allow form submit
}