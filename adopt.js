document.addEventListener("DOMContentLoaded", () => {
    const pets = [
        { id: 1, name: "Pet 1", image: "./src/sample_data/pet1.png" },
        { id: 2, name: "Pet 2", image: "./src/sample_data/pet2.png" },
        { id: 3, name: "Pet 3", image: "./src/sample_data/pet3.png" },
        { id: 4, name: "Pet 4", image: "./src/sample_data/pet4.png" },
        { id: 5, name: "Pet 5", image: "./src/sample_data/pet5.png" },
        { id: 6, name: "Pet 6", image: "./src/sample_data/pet6.png" }
    ];

    const petGrid = document.getElementById("pet-grid");

    pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.classList.add("col-lg-4", "col-md-6", "mb-4");

        petCard.innerHTML = `
            <div class="card h-100">
                <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">This is ${pet.name}. Click "Adopt" to learn more about adopting this pet.</p>
                </div>
                <div class="card-footer">
                    <a href="#" class="btn btn-primary btn-block">Adopt</a>
                </div>
            </div>
        `;

        petGrid.appendChild(petCard);
    });
});
