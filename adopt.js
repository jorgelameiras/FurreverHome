// Function to fetch pets
async function fetchPets(filters = {}) {
    try {
        // Build query parameters from filters
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:5500/pets?${queryParams}`);
        const pets = await response.json();

        const petGrid = document.getElementById("pet-grid");
        petGrid.innerHTML = '';

        // Render each pet card
        pets.forEach((pet) => {
            const petCard = document.createElement("div");
            petCard.classList.add("card");

            petCard.innerHTML = `
                <img src="${pet.imageLink[0]}" alt="${pet.name}" class="card-img">
                <div class="card-content">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">Age: ${pet.age}, Gender: ${pet.gender}, Size: ${pet.size}</p>
                </div>
                <div class="card-footer">
                    <a href="#" class="learn-more">Learn More</a>
                </div>
            `;
            petGrid.appendChild(petCard);
        });
    } catch (error) {
        console.error("Error fetching pets:", error);
    }
}

// Event listener for Apply Filters button
document.getElementById("apply-filters").addEventListener("click", () => {
    const type = document.getElementById("type-filter").value;
    const age = document.getElementById("age-filter").value;
    const gender = document.getElementById("gender-filter").value;
    const size = document.getElementById("size-filter").value;

    // Prepare filters object
    const filters = {
        type: type !== "all" ? type : "",
        age: age !== "all" ? age : "",
        gender: gender !== "all" ? gender : "",
        size: size !== "all" ? size : "",
    };

    console.log("Filters being sent:", filters);

    // Fetch pets with the selected filters
    fetchPets(filters);
});

// Fetch all pets initially on page load
fetchPets();