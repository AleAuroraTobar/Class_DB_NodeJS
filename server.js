//SERVER

// Importing the Express framework
const express = require("express");

// Creating an Express application
const app = express();

// Importing functions to interact with the database
const { obtenerViajes, agregarViaje } = require('./consultas');

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to retrieve all trips from the database
app.get("/viajes", async (req, res) => {
    const viajes = await obtenerViajes(); // Calls the function to fetch data from the database
    res.json(viajes); // Sends the result as a JSON response
});

// API endpoint to add a new trip to the database
app.post("/viajes", async (req, res) => {
    const { destino, presupuesto } = req.body; // Extracting data from the request body
    
    await agregarViaje(destino, presupuesto); // Calls the function to insert data into the database

    res.send("Trip successfully added"); // Sends a confirmation response
});

// Start the server on port 4000
app.listen(4000, () => {
    console.log('Server running on port 4000');
});
