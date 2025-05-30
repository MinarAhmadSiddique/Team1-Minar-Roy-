function displayTicket() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const ticketDetails = document.getElementById("ticketDetails");
    //checks if booking is empty
    if (bookings.length === 0) {
        ticketDetails.innerHTML = `<p>No bookings found.</p>`;
        return;
    } 
    //runs loop for to fill in ticket
    bookings.forEach((info, index) => {
        const div = document.createElement("div");
        div.classList.add("ticket");
        div.innerHTML = `<h2>Booking #${index + 1}</h2>`;

        for (const [i, value] of Object.entries(info)) {
            const p = document.createElement("p");
            p.innerHTML = `<span class="highlight">${i.replace(/_/g, ' ')}:</span> ${value}`;
            div.appendChild(p);
        }

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove Booking";
        removeBtn.style.marginTop = "1%";
        removeBtn.onclick = function () {
            removeBooking(index);
        };

        div.appendChild(removeBtn);
        ticketDetails.appendChild(div);
    });
}
function removeBooking(index) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.splice(index, 1); 
    localStorage.setItem("bookings", JSON.stringify(bookings));
    location.reload(); 
}

window.onload = displayTicket;