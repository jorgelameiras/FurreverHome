const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get('/api/pets', async (req, res) => {
  try {
    const pets = await prisma.pet.findMany({
      // Add any filters or include statements as needed
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pets' });
  }
});