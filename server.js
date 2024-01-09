const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Add this line to enable CORS

// Middleware to parse incoming JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Object to store form data
const formDataObject = {};

// POST endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);

    // Populate the object with form data
    Object.assign(formDataObject, formData);

    // You can add more processing or validation here if needed

    // Send a response
    res.json({ message: 'Form submission successful!', data: formDataObject });
});

// GET endpoint to retrieve the current state of the object
app.get('/data', (req, res) => {
    res.json({ data: formDataObject });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
