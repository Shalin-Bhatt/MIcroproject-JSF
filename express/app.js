const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve JSON data
app.get('/recipes', (req, res) => {
    const jsonFilePath = path.join(__dirname, 'data', 'recipes.json');
    fs.readFile(jsonFilePath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading JSON file');
            return;
        }
        const recipes = JSON.parse(data);
        res.json(recipes);
    });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
