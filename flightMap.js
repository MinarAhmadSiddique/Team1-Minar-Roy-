function toBook() {
    const selected = document.getElementById("destination").value;
    if (selected) {
        localStorage.setItem("destination", selected);
        window.location.href = "Booking.html";
    } else {
        alert("Please choose a destination");
    }
}


var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const cityCoords = {
    "New York": [40.7128, -74.0060],
    "Los Angeles": [33.9416, -118.4085],
    "London": [51.4680, 0.4551],
    "Mumbai": [19.0902, 72.8628],
    "Beijing": [40.0799, 116.6031],
    "Bogota": [4.7010, -74.1461]
};

const cityInfoData = {
    "Los Angeles": {
        description: "Los Angeles, known for its film industry, beautiful beaches, and cultural landmarks, is a vibrant and iconic US city.",
        image: "Los_Angeles.png"
    },
    "London": {
        description: "London offers a mix of iconic sights, world-class museums, and vibrant neighborhoods, making it an unforgettable destination for any traveler.",
        image: "london.png"
    },
    "Mumbai": {
        description: "Mumbai is a vibrant, chaotic, and exciting city where street food, seaside views, and rich history offer something new around every corner",
        image: "mumbai.png"
    },
    "Beijing": {
        description: "Beijing is a city where old meets new, with ancient temples and narrow alleyways beside busy roads and glass towers.",
        image: "beijing.png"
    },
    "Bogota": {
        description: "Bogotá is a colorful, energetic city where you can wander colonial streets, see bold street art, and take in sweeping mountain views-all in one day.",
        image: "bogota.png"
    }
};

let currentMarkers = [];
let currentLine = null;

window.seemap = function () {
    const fromSelect = document.querySelector('select:nth-of-type(1)');
    const toSelect = document.querySelector('select:nth-of-type(2)');
    const fromCity = fromSelect.value;
    const toCity = toSelect.value;

    currentMarkers.forEach(marker => map.removeLayer(marker));
    if (currentLine) map.removeLayer(currentLine);
    currentMarkers = [];

    if (!(fromCity in cityCoords) || !(toCity in cityCoords)) {
        alert("Invalid city selection.");
        return;
    }

    const fromCoords = cityCoords[fromCity];
    const toCoords = cityCoords[toCity];

    const markerFrom = L.marker(fromCoords).addTo(map).bindPopup(`From: ${fromCity}`).openPopup();
    const markerTo = L.marker(toCoords).addTo(map).bindPopup(`To: ${toCity}`);
    currentMarkers.push(markerFrom, markerTo);

    currentLine = L.polyline([fromCoords, toCoords], {
        color: 'blue',
        weight: 3
    }).addTo(map);

    map.fitBounds([fromCoords, toCoords], { padding: [50, 50] });

    const infoContainer = document.getElementById("cityInfo");

    if (cityInfoData[toCity]) {
        const { description, image } = cityInfoData[toCity];
        infoContainer.style.display = "flex";
        infoContainer.style.flexDirection = "row";
        infoContainer.innerHTML = `
            <img src="${image}" alt="${toCity}" style="width: 240px; height: auto; border-radius: 8px;" />
            <div style="color: black; max-width: 300px;">
                <h3>${toCity}</h3>
                <p>${description}</p>
            </div>
        `;
    } else {
        infoContainer.style.display = "none";
        infoContainer.innerHTML = "";
    }
};
