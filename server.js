app.get('/pets', async (req, res) => {
  try {
      const { type, age, gender, size } = req.query;

      // Build dynamic filters for Prisma query
      const filters = {};

      // Match species: "cat" maps to "DOMESTIC SH", else assume "dog"
      if (type) {
          if (type.toLowerCase() === 'cat') {
              filters.species = { equals: 'DOMESTIC SH', mode: 'insensitive' };
          } else if (type.toLowerCase() === 'dog') {
              filters.species = { not: 'DOMESTIC SH', mode: 'insensitive' };
          }
      }

      // Match age: exact value or "4+" for gte: 4
      if (age) {
          if (age === '4+') {
              filters.age = { gte: 4 }; // Greater than or equal to 4
          } else {
              filters.age = parseInt(age, 10); // Convert age to integer
          }
      }

      // Match gender: Capitalized values ("Male", "Female")
      if (gender) {
          filters.gender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
      }

      // Match size: Uppercase values ("SMALL", "MED", "LARGE")
      if (size) {
          filters.size = size.toUpperCase();
      }

      // Log filters for debugging
      console.log('Filters:', filters);

      // Fetch pets based on filters; fetch all if no filters provided
      const pets = await prisma.pet.findMany({
          where: Object.keys(filters).length ? filters : undefined,
      });

      res.json(pets);
  } catch (error) {
      console.error('Error fetching pets:', error);
      res.status(500).send('Error fetching pets');
  }
});
