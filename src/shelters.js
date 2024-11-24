document.addEventListener("DOMContentLoaded", () => {
    const shelters = [
        {
            name: "Happy Paws Shelter",
            image: "./src/shelter1.jpg",
            address: "123 Main St, Your City, State 12345",
            phone: "(123) 456-7890",
            website: "https://www.happypawsshelter.com"
        },
        {
            name: "Furry Friends Rescue",
            image: "./src/shelter2.jpg",
            address: "456 Oak Ave, Your City, State 12345",
            phone: "(987) 654-3210",
            website: "https://www.furryfriendsrescue.org"
        },
        // Add more shelter objects as needed
    ];

    const shelterGrid = document.getElementById("shelter-grid");

    shelters.forEach(shelter => {
        const shelterCard = document.createElement("div");
        shelterCard.classList.add("shelter-card");

        shelterCard.innerHTML = `
            <img src="${shelter.image}" alt="${shelter.name}" class="shelter-image">
            <div class="shelter-info">
                <h3 class="shelter-name">${shelter.name}</h3>
                <p class="shelter-address">${shelter.address}</p>
                <p class="shelter-phone">${shelter.phone}</p>
                <a href="${shelter.website}" class="shelter-website" target="_blank">Visit Website</a>
            </div>
        `;

        shelterGrid.appendChild(shelterCard);
    });
});