const express = require('express');
const bodyParser = require('body-parser');
const listingRoutes = require('./routes/listing');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/listing', listingRoutes);

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
