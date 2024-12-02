// Function to fetch pets with filters
async function fetchPets(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        console.log('Query parameters:', queryParams); // Debugging
        const response = await fetch(`http://localhost:5500/pets?${queryParams}`);
        const pets = await response.json();
        console.log('Pets received from server:', pets); // Debugging

        const petGrid = document.getElementById("pet-grid");
        petGrid.innerHTML = '';

        pets.forEach((pet) => {
            if (!pet.name || pet.name.trim() === '') {
                return;
            }

            const petCard = document.createElement("div");
            petCard.classList.add("card");

            // Display pet details: age and gender
            const ageText = pet.age ? `${pet.age}` : "Age not available";

            petCard.innerHTML = `
                <img src="${pet.imageLink[0]}" alt="${pet.name}" class="card-img">
                <div class="card-content">
                    <h5 class="card-title">${pet.name}</h5>
                    <strong>Age:</strong> ${ageText}
                    <strong>Gender:</strong> ${pet.gender}
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

    // Fetch pets with the selected filters
    fetchPets(filters);
});

// Fetch all pets initially on page load
fetchPets();
