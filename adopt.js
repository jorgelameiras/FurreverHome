let currentPage = 1;
const itemsPerPage = 8;

// Global filter state
let currentFilters = {};

// Fetch pets with pagination
async function fetchPets(filters = {}) {
    try {
        currentFilters = { ...currentFilters, ...filters };
        const queryParams = new URLSearchParams(currentFilters).toString();
        const response = await fetch(`http://localhost:5500/pets?${queryParams}`);
        const { pets } = await response.json();

        localStorage.setItem('allPets', JSON.stringify(pets));
        updatePetGrid(pets);
    } catch (error) {
        console.error("Error fetching pets:", error);
    }
}



// Update pet grid
function updatePetGrid(pets) {
    const petGrid = document.getElementById("pet-grid");
    petGrid.innerHTML = '';

    if (pets.length === 0) {
        petGrid.innerHTML = '<p>No pets found. Please adjust your filters.</p>';
        return;
    }

    pets.forEach((pet) => {
        // Skip pets with null or empty `imageLink`
        if (!pet.imageLink || pet.imageLink.length === 0) return;

        if (!pet.name || pet.name.trim() === '') return;

        const petCard = document.createElement("div");
        petCard.classList.add("card");

        const isFavorited = (JSON.parse(localStorage.getItem('favorites')) || []).includes(pet.id);

        petCard.innerHTML = `
            <button class="heart-button ${isFavorited ? 'active' : ''}" onclick="toggleFavorite(${pet.id})" aria-label="Add to favorites">
                <svg viewBox="0 0 24 24" class="heart-icon">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
            <img src="${pet.imageLink[0]}" alt="${pet.name}" class="card-img">
            <div class="card-content">
                <h5 class="card-title">${pet.name}</h5>
                <div class="extra-content" style="display: none;">
                    <strong>Age:</strong> ${pet.age || "N/A"}<br>
                    <strong>Gender:</strong> ${pet.gender || "N/A"}<br>
                    <strong>Description:</strong> ${pet.description || "No description available."}<br>
                    <strong>Size:</strong> ${pet.size || "N/A"}<br>
                    <strong>Species:</strong> ${pet.species || "N/A"}<br>
                    <strong>Shelter:</strong> ${pet.shelterId || "N/A"}
                </div>
                <button class="read-more-btn" onclick="toggleCardExpansion(event)">Read More</button>
            </div>
        `;

        petGrid.appendChild(petCard);
    });
}

// Toggle expansion for individual cards
function toggleCardExpansion(event) {
    const cardContent = event.target.closest('.card').querySelector('.extra-content');
    const card = event.target.closest('.card');

    if (cardContent.style.display === 'none') {
        cardContent.style.display = 'block';
        card.classList.add('expanded');
        event.target.textContent = 'Read Less';
    } else {
        cardContent.style.display = 'none';
        card.classList.remove('expanded');
        event.target.textContent = 'Read More';
    }
}

// Toggle expansion for individual cards
function toggleCardExpansion(event) {
    const cardContent = event.target.closest('.card').querySelector('.extra-content');
    const shortDescription = event.target.closest('.card').querySelector('.short-description');
    const card = event.target.closest('.card');

    if (cardContent.style.display === 'none') {
        cardContent.style.display = 'block';
        shortDescription.style.display = 'none';
        card.classList.add('expanded');
        event.target.textContent = 'Read Less';
    } else {
        cardContent.style.display = 'none';
        shortDescription.style.display = 'block';
        card.classList.remove('expanded');
        event.target.textContent = 'Read More';
    }
}


// Event listener for Apply Filters button
document.getElementById("apply-filters").addEventListener("click", () => {
    const type = document.getElementById("type-filter").value;
    const age = document.getElementById("age-filter").value;
    const gender = document.getElementById("gender-filter").value;
    const size = document.getElementById("size-filter").value;

    currentPage = 1; // Reset to the first page on filter application
    const filters = {
        type: type !== "all" ? type : "",
        age: age !== "all" ? age : "",
        gender: gender !== "all" ? gender : "",
        size: size !== "all" ? size : "",
    };

    console.log("Filters being applied:", filters); // Debug log
    fetchPets(filters);
});


// Favorites functionality
function toggleFavorite(petId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(petId);

    if (index > -1) {
        favorites.splice(index, 1); // Remove from favorites
    } else {
        favorites.push(petId); // Add to favorites
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    fetchPets(); // Refresh pet grid
}


function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesCounter = document.querySelector('.favorites-content span'); // sdjust selector if needed
    if (favoritesCounter) {
        favoritesCounter.textContent = favorites.length; // Update counter
    }
}


// Initialize favorites count
updateFavoritesCount();

// Fetch all pets initially on page load
fetchPets();

document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    fetchPets(); 
});

