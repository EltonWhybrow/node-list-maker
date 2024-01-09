const express = require('express');
const { validationResult, body } = require('express-validator');
const bodyParser = require('body-parser');

const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors()); // Add this line to enable CORS

// Middleware to parse incoming JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Object to store form data
const formDataObject = {};

// POST endpoint to handle form submissions
app.post('/submit',
    // middleware
    [
        // Use express-validator to define validation rules
        body('field1').notEmpty().withMessage('Field 1 is required'),
        body('field2').notEmpty().withMessage('Field 2 is required'),
    ],
    (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const formData = req.body;
        console.log('Received form data:', formData);

        // Populate the object with form data
        Object.assign(formDataObject, formData);

        // Send a response
        res.json({ message: 'List data added!', data: formDataObject });

        // Write the data to a JSON file
        const jsonData = JSON.stringify(formDataObject, null, 2);
        fs.writeFileSync('created_list.json', jsonData);

    });

// GET endpoint to retrieve the current state of the object
app.get('/data', (req, res) => {
    res.json({ data: formDataObject });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
