async function fetchPets() {
    try {
        const response = await fetch('http://localhost:5500/favorites', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch pets: ${response.status} ${response.statusText}`);
        }

        const pets = await response.json();

        const favoritesGrid = document.getElementById('favorites-grid');
        favoritesGrid.innerHTML = '';

        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('card');

            const petImage = pet.imageLink.length > 0 ? pet.imageLink[0] : '';

            petCard.innerHTML = `
                <button class="heart-button active" aria-label="Remove from favorites" onclick="removeFavorite(${pet.id})">
                    <svg viewBox="0 0 24 24" class="heart-icon">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                <img src="${petImage}" alt="${pet.name}" class="card-img">
                <div class="card-content">
                    <h5 class="card-title">${pet.name}</h5>
                    <strong>Age:</strong> ${pet.age || 'N/A'}<br>
                    <strong>Gender:</strong> ${pet.gender || 'N/A'}
                </div>
            `;
            favoritesGrid.appendChild(petCard);
        });
    } catch (error) {
        console.error('Error fetching pets:', error);
        alert('Failed to load pets. Please try again.');
    }
}

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Number of favorites:', favorites.length);
}


async function removeFavorite(petId) {
    try {
        const response = await fetch('http://localhost:5500/removeFavorite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({petId})
        });

        if (!response.ok) {
            throw new Error(`Failed to remove pet: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error fetching pets:', error);
        alert('Failed to load pets. Please try again.');
    }
    fetchPets();
}
window.removeFavorite = removeFavorite;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Favorites page loaded');
    fetchPets();
});