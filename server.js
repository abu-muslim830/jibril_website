// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to read incoming JSON data from the form
app.use(express.json()); 

// Serve static files (HTML, CSS, JS) from the folder
app.use(express.static(__dirname));

// API Route to receive contact form messages (Requirement 3)
app.post('/api/contact', (req, res) => {
    const { name, phone, message } = req.body;

    // Logs the message in your terminal
    console.log('\n=== New Customer Message ===');
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Message: ${message}`);
    console.log('============================\n');

    // Send success response back to script.js
    res.json({ success: true, message: 'Message received loudly and clearly!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`\nServer is running beautifully on http://localhost:${PORT}`);
    console.log(`Open your browser and visit: http://localhost:${PORT}`);
});
