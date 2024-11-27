document.addEventListener('DOMContentLoaded', () => {
    const petGallery = document.getElementById('pet-gallery');
  
    fetch('/api/pets')
      .then(response => response.json())
      .then(pets => {
        pets.forEach(pet => {
          const petCard = document.createElement('div');
          petCard.className = 'pet-card';
          petCard.innerHTML = `
            <img src="${pet.imageUrl}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <p>Breed: ${pet.breed}</p>
            <p>Age: ${pet.age}</p>
          `;
          petGallery.appendChild(petCard);
        });
      })
      .catch(error => console.error('Error fetching pets:', error));
  });