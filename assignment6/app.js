const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const usersFilePath = 'users.json'; // Path to the JSON file

// Set up middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public')); // Serve static files (e.g., CSS, JS)
app.use(bodyParser.urlencoded({ extended: true })); // Handle form data
app.use(express.json()); // Handle JSON data in request bodies

// Load users from JSON file
const loadUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([])); // Create the file if it doesn't exist
  }
  return JSON.parse(fs.readFileSync(usersFilePath));
};

// Save users to JSON file
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users));
};

// Middleware for validating user data during registration
const validateRegistrationData = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and Password are required');
  }
  next(); // Proceed to the next middleware or route handler
};

// Middleware for validating user data during login
const validateLoginData = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and Password are required');
  }
  next();
};

// ********** Pug Templates Routes **********

// Home route (renders index.pug)
app.get('/', (req, res) => {
  res.render('index');
});

// Render registration form (register.pug)
app.get('/register', (req, res) => {
  res.render('register');
});

// Render login form (login.pug)
app.get('/login', (req, res) => {
  res.render('login');
});

// ********** USER REGISTRATION ROUTE **********
app.post('/register', validateRegistrationData, (req, res) => {
  const { username, password } = req.body;

  const users = loadUsers();

  // Check if username already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Add new user and save to the JSON file
  users.push({ username, password });
  saveUsers(users);

  res.status(201).send('User registered successfully');
});

// ********** USER LOGIN ROUTE **********
app.post('/login', validateLoginData, (req, res) => {
  const { username, password } = req.body;

  const users = loadUsers();

  // Check if the user exists and the password matches
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// ********** FETCH USERS ROUTE **********
app.get('/users', (req, res) => {
  const users = loadUsers();
  res.status(200).json(users); // Send the list of users as JSON
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});