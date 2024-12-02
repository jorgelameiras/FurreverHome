let currentPage = 1;
const itemsPerPage = 8; 

// Fetch pets with pagination
async function fetchPets(filters = {}) {
    try {
        filters.page = currentPage;
        filters.limit = itemsPerPage;

        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:5500/pets?${queryParams}`);
        const { pets, totalPages } = await response.json();

        updatePetGrid(pets);
        updatePaginationControls(totalPages);
    } catch (error) {
        console.error("Error fetching pets:", error);
    }
}

// Update pet grid
function updatePetGrid(pets) {
    const petGrid = document.getElementById("pet-grid");
    petGrid.innerHTML = '';

    pets.forEach((pet) => {
        if (!pet.name || pet.name.trim() === '') return;

        const petCard = document.createElement("div");
        petCard.classList.add("card");

        petCard.innerHTML = `
            <img src="${pet.imageLink[0]}" alt="${pet.name}" class="card-img">
            <div class="card-content">
                <h5 class="card-title">${pet.name}</h5>
                <strong>Age:</strong> ${pet.age || "N/A"}
                <strong>Gender:</strong> ${pet.gender || "N/A"}
            </div>
            <div class="card-footer">
                <a href="#" class="learn-more">Learn More</a>
            </div>
        `;

        petGrid.appendChild(petCard);
    });
}

// Update pagination controls
function updatePaginationControls(totalPages) {
    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage}`;
}

// Event listeners for pagination
document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPets();
    }
});

document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    fetchPets();
});

// Event listener for Apply Filters button
document.getElementById("apply-filters").addEventListener("click", () => {
    const type = document.getElementById("type-filter").value;
    const age = document.getElementById("age-filter").value;
    const gender = document.getElementById("gender-filter").value;
    const size = document.getElementById("size-filter").value;

    const filters = {
        type: type !== "all" ? type : "",
        age: age !== "all" ? age : "",
        gender: gender !== "all" ? gender : "",
        size: size !== "all" ? size : "",
    };

    fetchPets(filters);
});

// Fetch all pets initially on page load
fetchPets();
