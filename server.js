const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS to allow Angular app to communicate with the backend

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Default XAMPP MySQL username
    password: '',  // Default XAMPP MySQL password is empty
    database: 'registration_db'  // Name of your database
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// POST route to submit registration data
app.post('/registrations', (req, res) => {
    const { name, age, random1, random2 } = req.body;

    // SQL query to insert registration data into the database
    const sql = 'INSERT INTO registrations (name, age, random1, random2) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, age, random1, random2], (err, result) => {
        if (err) {
            console.error('Error inserting registration:', err);
            return res.status(500).send('Error saving registration');
        }
        res.send('Registration inserted successfully');
    });
});

// GET route to fetch all registrations
app.get('/registrations', (req, res) => {
    // SQL query to fetch all registrations
    const sql = 'SELECT * FROM registrations';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching registrations:', err);
            return res.status(500).send('Error fetching registrations');
        }
        res.json(results);
    });
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
