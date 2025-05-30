window.onload = function () {
    var hasAccount = confirm("Do you have an account?");
    if (hasAccount) {
        alert("Great! Please continue to booking");
        const users = JSON.parse(localStorage.getItem("users"));
    } else {
        alert("Let's create a new account.");
        window.location.href = "../HTML/Signup.html"
    }
};
//gets city from flight page
const destination = localStorage.getItem("destination");
const message = `From: <span class="highlight">New York City</span> To: <span class="highlight">${destination}</span>`
document.getElementById("dest").innerHTML = message;


//saves all info used in booking page to use on ticket page
function bookingInfo() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    const values = {
        Location:message,
        Departure_Date: document.getElementById("departure").value,
        Return_Date: document.getElementById("return").value,
        Passengers: document.getElementById("passengers").value,
        Flight_Class: document.getElementById("class").value,
        Full_Name:currentUser.Full_Name,
        DOB: currentUser.DOB,
        Passport: document.getElementById("passport").value,
        PassportExp: document.getElementById("passportExp").value,
        Email: currentUser.Email,
        Phone: currentUser.Phone_Num,
        CardName: document.getElementById("cardname").value,
        CardNumber: document.getElementById("cardnumber").value,
        ExpDate: document.getElementById("expdate").value,
        CVV: document.getElementById("cvv").value
    }

    //checks if fields are full
    for (let i in values) {
        if (!values[i]) {
            alert(`Please fill in ${i} field`);
            return;
        } else {
            localStorage.setItem(i, values[i]);
        }
    }
    //used to make sure departure and return follow rules
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const depDate = new Date(values.Departure_Date);
    const retDate = new Date(values.Return_Date);

    if (depDate <= today) {
        alert("Departure date must be after today.");
        return;
    }

    if (retDate <= depDate) {
        alert("Return after the departure date.");
        return;
    }
    //makes a variable thats is used in ticketconfirmation to display values
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    //pushes all values into booking
    bookings.push(values);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    window.location.href ="TicktetConfirmation.html"
}