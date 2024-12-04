async function fetchFavoritesFromLocalStorage() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesGrid = document.getElementById('favorites-grid');
    favoritesGrid.innerHTML = '';

    try {
        const allPets = JSON.parse(localStorage.getItem('allPets')) || [];
        const validFavorites = favorites.map(favoriteId =>
            allPets.find(pet => pet.id === favoriteId)
        ).filter(Boolean);

        validFavorites.forEach(pet => {
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
        console.error("Error fetching pets for favorites:", error);
    }
}


function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log('Number of favorites:', favorites.length);
}


function removeFavorite(petId) {
    // Retrieve favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Remove the petId from the favorites array
    const updatedFavorites = favorites.filter((id) => id !== petId);

    // Update local storage with the updated array
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Refresh the favorites page to reflect changes
    fetchFavoritesFromLocalStorage();
}
window.removeFavorite = removeFavorite;



document.addEventListener('DOMContentLoaded', () => {
    console.log('Favorites page loaded');
    fetchFavoritesFromLocalStorage();
});
