const express = require('express');
const router = express.Router();

let listings = []; 
let idCounter = 1;

router.get('/', (req, res) => {
    res.json({ data: listings });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const item = listings.find(listing => listing.id === id);

    if (!item) {
        return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ data: item });
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const index = listings.findIndex(listing => listing.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Listing not found" });
    }

    listings.splice(index, 1);

    res.status(200).send("OK");
});

module.exports = router;
