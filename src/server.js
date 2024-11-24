const { PrismaClient } = require("@prisma/client");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500;

const prisma = new PrismaClient()

app.use(cors());

app.get('/pets', async (req, res) =>{
    try {
        const pets = await prisma.pet.findMany();
        res.json(pets);
    }catch(error){
        console.error(error);
        res.status(500).send('Error fetching pets');
    }
});

app.listen(port,()=> {
    console.log('Server is running at http://localhost:', port);
})