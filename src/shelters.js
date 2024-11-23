document.addEventListener("DOMContentLoaded", () => {
    const shelters = [
        {
            name: "Pet Rescue By Judy",
            image: "./src/petrescueshelter.png",
            address: "401 South Laurel Ave, Sanford, FL",
            city: "Sanford",
            state: "FL",
            zip: "32771",
            phone: "(123) 456-7890",
            rating: 4.5
        },
        {
            name: "Second Chance Shelter",
            image: "./src/secondchanceshelter.jpg",
            address: "456 Oak Ave, Orlando, FL 32810",
            city: "Orlando",
            state: "FL",
            zip: "32801",
            phone: "(987) 654-3210",
            rating: 4.8
        },
        {
            name: "Orange County Shelter",
            image: "./src/orangecountyshelter.png",
            address: "789 Pine Rd, Orlando, FL 32839",
            city: "Orlando",
            state: "FL",
            zip: "32839",
            phone: "(321) 555-1234",
            rating: 4.2
        }
    ];

    function displayShelters(sheltersToDisplay) {
        const shelterGrid = document.querySelector('.gallery-grid');
        shelterGrid.innerHTML = '';

        sheltersToDisplay.forEach(shelter => {
            const shelterCard = document.createElement('div');
            shelterCard.className = 'shelter-card';
            shelterCard.innerHTML = `
                <img src="${shelter.image}" alt="${shelter.name}" class="shelter-image">
                <div class="shelter-info">
                    <h3>${shelter.name}</h3>
                    <p>${shelter.address}</p>
                    <p>${shelter.phone}</p>
                    <a href="#" class="learn-more">Learn More</a>
                </div>
            `;
            shelterGrid.appendChild(shelterCard);
        });
    }

    function searchShelters() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase().trim();
    
        const filteredShelters = shelters.filter(shelter => {
            return (
                shelter.name.toLowerCase().includes(searchTerm) ||
                shelter.address.toLowerCase().includes(searchTerm) ||
                shelter.city.toLowerCase().includes(searchTerm) ||
                shelter.state.toLowerCase().includes(searchTerm) ||
                shelter.zip.includes(searchTerm)
            );
        });
    
        displayShelters(filteredShelters);
    }

    function sortShelters() {
        const sortSelect = document.getElementById('sortSelect');
        const currentShelters = [...shelters];

        switch(sortSelect.value) {
            case 'name':
                currentShelters.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                currentShelters.sort((a, b) => b.rating - a.rating);
                break;
            case 'distance':
                // Add distance logic if needed
                break;
        }

        displayShelters(currentShelters);
    }

    // Initial display
    displayShelters(shelters);

    // Event listeners
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchShelters);

    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', sortShelters);
});
