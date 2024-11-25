const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require('fs');


async function main() {
  try {
    // Read the JSON file
    const data = fs.readFileSync('ocas-cats-url.json', 'utf-8');
    const pets = JSON.parse(data);

    // Iterate over the data and add it to the database
    for (const pet of pets) {
      if(pet.age === null){
        pet.age = 1;
      }
      const createdPet = await prisma.pet.create({
        data: {
          name: pet.name,
          imageLink: pet.image_urls,
          species: pet.breed,
          age: pet.age,
          gender: pet.gender,
          size: pet.size,
          description: "N/A",
          dateOfArrival: "N/A",
        },
      });
      console.log('Inserted:', createdPet);
    }

    console.log('All data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
main();
