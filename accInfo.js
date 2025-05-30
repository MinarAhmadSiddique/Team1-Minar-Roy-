const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

function displayAccountInfo() {
    const profile = document.getElementById("userprofile");

    if (!currentUser) {
        profile.innerHTML = `<p>No user is currently logged in.</p>`;
        return;
    }

    profile.innerHTML = `
        <h2>Username: ${currentUser.Username}</h2>
        <p>Password: ${currentUser.Password}</p>
        <p>Email: ${currentUser.Email}</p>
        <p>Phone Number: ${currentUser.Phone_Num}</p>
        <p>Full Name: ${currentUser.Full_Name}</p>
        <p>DOB: ${currentUser.DOB}</p>
        <button type="button" onclick="deleteUser()">Delete Account</button>
        <br><br>
        <button type="button" onclick="toggleTickets()">View Your Bookings</button>
        <div id="userTickets" style="margin-top:20px;"></div>
    `;
}

function deleteUser() {
    if (!currentUser) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter(user => user.Username !== currentUser.Username);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("currentUser");

    window.location.href = "Signup.html";
}

function toggleTickets() {
    const ticketContainer = document.getElementById("userTickets");
    if (ticketContainer.innerHTML !== "") {
        ticketContainer.innerHTML = "";
        return;
    }

    const userBookings = allBookings.filter(b => b.Email === currentUser.Email);

    if (userBookings.length === 0) {
        ticketContainer.innerHTML = "<p>You have no bookings.</p>";
        return;
    }

    userBookings.forEach((info, index) => {
        const div = document.createElement("div");
        div.classList.add("ticket");
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.marginBottom = "15px";
        div.innerHTML = `<h3>Booking #${index + 1}</h3>`;

        for (const [key, value] of Object.entries(info)) {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${key.replace(/_/g, ' ')}:</strong> ${value}`;
            div.appendChild(p);
        }

        ticketContainer.appendChild(div);
    });
}

window.onload = displayAccountInfo;