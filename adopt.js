async function fetchPets() {
    try {
        const response = await fetch('http://localhost:5500/pets');
        const pets = await response.json();

        const petGrid = document.getElementById("pet-grid");
        petGrid.innerHTML = '';

        pets.forEach(pet => {
            const petCard = document.createElement("div");
            petCard.classList.add("card");
            
            petCard.innerHTML = `
        <div class="card">
        <img src="${pet.imageLink[0]}" alt="${pet.name}">
        <div class="card-content">
            <h5 class="card-title">${pet.name}</h5>
            <p class="card-text">This is ${pet.name}. Information about this pet will be here.</p>
        </div>
        <div class="card-footer">
            <a href="#" class="learn-more">Learn More</a>
        </div>
    </div>
`;

        

            petGrid.appendChild(petCard);
        });
    } catch (error) {
        console.error('Error fetching pets:', error);
    }
}

fetchPets();
