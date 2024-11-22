const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable CORS to allow Angular app to communicate with the backend

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://pandeyharsh190902:Satwikpandey%4003@cluster0.vmrwa.mongodb.net/registrationDB?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Create a schema and model for registrations
const registrationSchema = new mongoose.Schema({
    name: String,
    age: Number,
    random1: String,
    random2: String
});

const Registration = mongoose.model('Registration', registrationSchema);

// POST route to add a new registration
app.post('/registrations', (req, res) => {
    const { name, age, random1, random2 } = req.body;

    // Create a new registration instance
    const newRegistration = new Registration({
        name,
        age,
        random1,
        random2
    });

    // Save the registration to MongoDB
    newRegistration.save()
        .then(() => res.send('Registration saved successfully'))
        .catch((error) => {
            console.error('Error saving registration:', error);
            res.status(500).send('Error saving registration');
        });
});

// GET route to fetch all registrations
app.get('/registrations', (req, res) => {
    Registration.find()
        .then((registrations) => res.json(registrations))
        .catch((error) => {
            console.error('Error fetching registrations:', error);
            res.status(500).send('Error fetching registrations');
        });
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
