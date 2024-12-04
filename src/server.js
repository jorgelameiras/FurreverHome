// Initialize Imports
const { PrismaClient } = require("@prisma/client");
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5500;
const session = require('express-session');
const bodyParser = require('body-parser');
const prisma = new PrismaClient()
const fs = require('fs').promises;

// Configure session middleware
app.use(session({
    secret: 'e@t_+H3_fR06', // used to sign session ID cookie
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        path: '/' }
}));

// Handle CORS functions in the browser
const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Handle preflight requests
app.options('*', cors());

// Initialize Parser
app.use(bodyParser.json());

// Log Server Requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    const originalSend = res.send;
    res.send = function (body) {
        return originalSend.apply(this, arguments);
    };
    next();
})

// Register new user 
app.post('/register', async (req, res) => {
    const users = await prisma.adopter.findMany();
    const { email, password } = req.body;

    // Check if username already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Account with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const createdAccount = await prisma.adopter.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });

    const account = await prisma.adopter.findUnique({ where: { email } });
    logLogin(account.id, email);
    res.status(201).json({ message: 'Account created successfully!' });
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const account = await prisma.adopter.findUnique({ where: { email } });
    if (!account) {
        return res.status(400).json({ message: 'Account with this email does not exist.' });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password.' });
    }

    // Set session user
    req.session.user = { id: account.id, email: account.email };
    res.set('Access-Control-Allow-Credentials', 'true');
    logLogin(account.id, email);
    res.status(200).json({ message: 'Login Successful!' });

});

// Remove pet from users favorites list
app.post('/removeFavorite', async (req, res) => {
    const currentUserID = await getCurrentUser();
    const {petId} = req.body;
    console.log("PETID:", petId);
    try {
        // Check if the adopter and the pet exist
        const adopter = await prisma.adopter.findUnique({
            where: { id: currentUserID },
            include: { preferredPets: true },
        });
        if (!adopter) {
            console.error('Adopter not found!');
            return res.status(400).json({ message: 'Adopter not found.' });
        }

        const pet = await prisma.pet.findUnique({
            where: { id: petId },
        });

        if (!pet) {
            console.error('Pet not found!');
            return res.status(400).json({ message: 'Pet not found.' });
        }

        // Update the adopter's preferredPets by disconnecting the pet
        const updatedAdopter = await prisma.adopter.update({
            where: { id: currentUserID},
            data: {
                preferredPets: {
                    disconnect: { id: petId }, // Disconnect the pet by its ID
                },
            },
            include: { preferredPets: true }, // To confirm the update
        });

        res.status(200).json({ message: 'Pet Removed Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing pet.' });
    }

});

// Add pet to users favorites list
app.post('/addFavorite', async (req, res) => {
    const currentUserID = await getCurrentUser(); // Ensure this function returns the correct user ID
    const { petId } = req.body;

    try {
        // Check if the adopter and the pet exist
        const adopter = await prisma.adopter.findUnique({
            where: { id: currentUserID },
            include: { preferredPets: true },
        });

        if (!adopter) {
            console.error('Adopter not found!');
            return res.status(400).json({ message: 'Adopter not found.' });
        }

        const pet = await prisma.pet.findUnique({
            where: { id: petId },
        });

        if (!pet) {
            console.error('Pet not found!');
            return res.status(400).json({ message: 'Pet not found.' });
        }

        // Update the adopter's preferredPets by connecting the pet
        const updatedAdopter = await prisma.adopter.update({
            where: { id: currentUserID },
            data: {
                preferredPets: {
                    connect: { id: petId }, // Connect the pet by its ID
                },
            },
            // include: { preferredPets: true }, // To confirm the update
        });

        res.status(200).json({ message: 'Pet Added Successfully!', updatedAdopter });
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).json({ message: 'Error adding pet to favorites.' });
    }
});

// Get all pets
app.get('/pets', async (req, res) =>{
    try {
        const pets = await prisma.pet.findMany();
        res.json(pets);
    }catch(error){
        console.error(error);
        res.status(500).send('Error fetching pets');
    }
});

// Check if a pet is favorited
app.get('/isFavorited', async (req, res) =>{
    const currentUserID = await getCurrentUser();
    const { petId } = req.body;
    try {
        const pet = await prisma.pet.findUnique({
            where: { 
                id: petId,
                adopterId: currentUserID },
        });
        if(!pet){
            return res.json(false)}
        
        return res.json(true);
    }catch(error){
        console.error(error);
        res.status(500).send('Error fetching pets');
    }
});

// Get favorites
app.get('/favorites', async (req, res) => {

    const currentUserID = await getCurrentUser();
    if(currentUserID === 0){
        return res.status(400).json({message: 'Must be logged in to view favorites.'});
    }

    const adopter = await prisma.adopter.findUnique({
        where: { id: currentUserID },
    });

    if (!adopter) {
        return res.status(404).json({ message: 'User not found.' });
    }

    try {
        const pets = await prisma.adopter.findUnique({ 
            where: { 
                id: adopter.id },
            select:{
                preferredPets: true
            } });
        
        res.json(pets.preferredPets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Error fetching pets.' });
    }
});

// Function to log email and account ID at login
function logLogin(adopterid, email) {
    fs.readFile('./log.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading log file:', err);
            return;
        }

        let logs = [];
        if (data) {
            try {
                logs = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing log file:', parseErr);
                return;
            }
        }

        // Add the new login record
        logs.push({ adopterid, email, timestamp: new Date().toISOString() });

        // Write the updated log back to the file
        fs.writeFile('./log.json', JSON.stringify(logs, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to log file:', writeErr);
                return;
            }
            console.log(`Logged login for ${email}`);
        });
    });
}

// Keep track of current user
async function getCurrentUser() {
    try {
        const data = await fs.readFile('./log.json', 'utf8');
        const jsonData = JSON.parse(data);

        if (Array.isArray(jsonData) && jsonData.length > 0) {
            const currentUser = jsonData[jsonData.length - 1];
            return currentUser.adopterid;
        } else {
            return 0;
        }
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
        return 0; // Fallback value in case of an error
    }
}

app.get('/currentUser', async (req, res) =>{
    try {
        const data = await fs.readFile('./log.json', 'utf8');
        const jsonData = JSON.parse(data);
        if (Array.isArray(jsonData) && jsonData.length > 0) {
            const currentUser = jsonData[jsonData.length - 1];
            res.json(currentUser.adopterid);
        } else {
            res.json(0);
        }
        } catch (err) {
        console.error('Error fetching current user:', err);
        res.json(0); // Fallback value in case of an error
        }
});

// Start Server
app.listen(port,()=> {
    console.log('Server is running at http://localhost:', port);
})