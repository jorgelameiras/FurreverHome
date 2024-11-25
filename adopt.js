async function fetchPets() {
    try{
        const response = await fetch('http://localhost:5500/pets');
        const pets = await response.json();

        const petGrid = document.getElementById("pet-grid");
        petGrid.innerHTML = '';

        pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.classList.add("col-lg-4", "col-md-6", "mb-4");

        petCard.innerHTML = `
            <div class="card h-100">
            <img src="${pet.imageLink[0]}" class="card-img-top" alt="${pet.name}">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">This is ${pet.name}. Information about pet will be here</p>
                </div>
                <div class="card-footer">
                    <a href="#" class="btn btn-info mb-4">More Information</a>
                </div>
            </div>
        `;

        petGrid.appendChild(petCard);
        });
    } catch(error){
        console.error('Error fetching pets:', error);
    }
}

fetchPets();