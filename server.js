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

    // Initialize filters object
    const filters = {};

    // Add type-specific filtering
    if (type === 'dog') {
      filters.species = {
        notIn: ['DOMESTIC SH', 'DOMESTIC MH', 'DOMESTIC LH', 'SIAMESE', 'BENGAL'],
      };
    } else if (type === 'cat') {
      filters.species = {
        in: ['DOMESTIC SH', 'DOMESTIC MH', 'DOMESTIC LH', 'SIAMESE', 'BENGAL'],
      };
    }

    // Add additional filters if provided
    if (age) {
      filters.age = parseInt(age, 10);
    }
    if (gender) {
      filters.gender = gender;
    }
    if (size) {
      filters.size = size.toUpperCase();
    }

    console.log('Filters applied:', filters); // Debugging log

    // Query database
    const pets = await prisma.Pet.findMany({
      where: filters,
    });

    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error); // Log the error
    res.status(500).json({ error: 'Error fetching pets.' });
  }
});



// Start the server

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
