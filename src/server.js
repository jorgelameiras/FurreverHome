const { PrismaClient } = require("@prisma/client");
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 5500;
const session = require('express-session');
const bodyParser = require('body-parser');
const prisma = new PrismaClient()

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
}));


app.use(bodyParser.json());

// Configure session middleware
app.use(session({
    secret: 'e@t_+H3_fR06', // used to sign session ID cookie
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: 'lax',
        path: '/' }
}));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log('Session Data:', req.session);
    console.log('Session ID:', req.sessionID);
    next();
})


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
    console.log("CREATED ACCOUNT:", createdAccount);
    res.status(201).json({ message: 'Account created successfully!' });
});

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

    // Debugging: Log session data after setting
    console.log('Session after login:', req.session);
    console.log('SessionID after login:', req.sessionID);

    res.status(200).json({ message: 'Login Successful!' });
});


app.get('/pets', async (req, res) =>{
    try {
        const pets = await prisma.pet.findMany();
        res.json(pets);
    }catch(error){
        console.error(error);
        res.status(500).send('Error fetching pets');
    }
});

app.get('/favorites', async (req, res) => {
    console.log("Favorites Session Data:", req.session);
    console.log("Favorites Session User:", req.session?.user);
    console.log('Favorites Session ID:', req.sessionID);

    if (!req.session.user) {
        return res.status(401).json({ message: 'Must be logged in to view favorites.' });
    }

    const adopter = await prisma.adopter.findUnique({
        where: { id: req.session.user.id },
    });

    if (!adopter) {
        return res.status(404).json({ message: 'User not found.' });
    }

    try {
        const pets = await prisma.adopter.findUnique({ 
            where: { 
                adopterId: adopter.id },
            select:{
                preferredPets: true
            } });
        
        res.json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Error fetching pets.' });
    }
});

app.get('/loginRedirect', async (req, res) => {

    console.log("SESSION ID REDIR:", req.sessionID);
    res.redirect('https://localhost:5500/favorites.html');

  });


app.listen(port,()=> {
    console.log('Server is running at http://localhost:', port);
})