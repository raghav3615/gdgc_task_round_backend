const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();
app.use(bodyParser.json());

// In-memory listings storage
let listings = [];
let idCounter = 1;

// 1. GET /listing - Get all items
app.get('/listing', (req, res) => {
    res.json({ data: listings });
});

// 2. GET /listing/:id - Get an item by ID
app.get('/listing/:id', (req, res) => {
    const { id } = req.params;
    const item = listings.find(listing => listing.id === id);

    if (!item) {
        return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ data: item });
});

// 3. POST /listing - Create a new item
app.post('/listing', (req, res) => {
    const { title, description, seller, rating = 0 } = req.body;

    if (!title || !description || !seller) {
        return res.status(400).json({ message: "Title, description, and seller are required" });
    }

    const newItem = {
        id: idCounter.toString(),
        title,
        description,
        seller,
        rating
    };
    listings.push(newItem);
    idCounter++;

    res.status(201).json({ data: newItem });
});

// 4. PUT /listing/:id - Update an item
app.put('/listing/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, rating } = req.body;

    const item = listings.find(listing => listing.id === id);

    if (!item) {
        return res.status(404).json({ message: "Listing not found" });
    }

    if (title) item.title = title;
    if (description) item.description = description;
    if (rating !== undefined) item.rating = rating;

    res.json({ data: item });
});

// 5. DELETE /listing/:id - Delete an item
app.delete('/listing/:id', (req, res) => {
    const { id } = req.params;
    const index = listings.findIndex(listing => listing.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Listing not found" });
    }

    listings.splice(index, 1);
    res.status(200).send("OK");
});

// Export the function for Vercel to use
module.exports = app;
