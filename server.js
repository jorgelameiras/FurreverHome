// Import required modules
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

// Initialize the app and Prisma client
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors()); 
app.use(express.json());

async function testPrismaQuery() {
  try {
    const result = await prisma.Pet.findMany({
      where: {
        species: {
          notIn: ['DOMESTIC SH', 'DOMESTIC MH', 'DOMESTIC LH', 'SIAMESE', 'BENGAL'],
        },
      },
    });
    console.log('Test Query Result:', result);
  } catch (error) {
    console.error('Prisma Test Query Error:', error.message);
  }
}

// Call the test function
testPrismaQuery();


// Route to fetch pets 
app.get('/pets', async (req, res) => {
  try {
      const { type, age, gender, size } = req.query;

      const speciesMap = {
          cat: ['DOMESTIC SH', 'DOMESTIC MH', 'DOMESTIC LH', 'SIAMESE', 'BENGAL'],
          dog: ['LABRADOR RETR', 'PIT BULL', 'AM PIT BULL TER', 'BOXER'],
      };

      const filters = {};
      if (type && speciesMap[type]) {
          filters.species = { in: speciesMap[type] };
      }
      if (age) {
          if (age === "4+") {
              filters.age = { gte: 4 };
          } else {
              filters.age = parseInt(age, 10);
          }
      }
      if (gender) filters.gender = gender;
      if (size) filters.size = size.toUpperCase();

      // Ensure `imageLink` is neither null nor an empty array
      filters.imageLink = {
          isEmpty: false, // Exclude pets with an empty array
      };

      const pets = await prisma.Pet.findMany({ where: filters });

      res.json({ pets });
  } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ error: "Failed to fetch pets" });
  }
});




// Favorites
app.get('/favorites', async (req, res) => {
  try {
      // Mock user for testing
      const user = 'mockUserId';
      if (!user) {
          return res.status(401).json({ error: 'User not authenticated' });
      }

      const favorites = [
          {
              id: 1,
              name: 'Pet 1',
              age: '2 years',
              gender: 'Male',
              imageLink: 'https://via.placeholder.com/300?text=Pet+1',
          },
          {
              id: 2,
              name: 'Pet 2',
              age: '3 years',
              gender: 'Female',
              imageLink: 'https://via.placeholder.com/300?text=Pet+2',
          },
      ];

      res.json(favorites); // Replace this with actual database logic
  } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ error: 'Error fetching favorites.' });
  }
});
// Start the server

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
