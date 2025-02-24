// QUERIES

// Import the 'pg' package to connect PostgreSQL with Node.js
const { Pool } = require('pg');

// What is a Pool?
// 'Pool' is a connection manager provided by the 'pg' package.
// Instead of opening a new connection for each query, a pool reuses existing connections.
// This improves performance and prevents excessive database connections.

const pool = new Pool({ // Creating a new connection pool with the necessary database configurations.

    host: "localhost",  // The database server is hosted on the local machine.
    user: "postgres",  // The username to connect to PostgreSQL (default is 'postgres' unless another user is specified).
    password: "333333",  // The password for the PostgreSQL user (change this for security purposes).
    database: "plan_de_viajes",  // The name of the database where queries will be executed.
    allowExitOnIdle: true,  // Automatically closes idle connections when no queries are pending.

});

// Function to retrieve all trips from the database
const obtenerViajes = async () => { 
    // Executes a SQL query to fetch all records from the "viajes" table.
    const result = await pool.query("SELECT * FROM viajes"); 

    console.log(result.rows); // Logs the retrieved data to the console for debugging.

    // result.rows returns an array of objects, where each object represents a row from the "viajes" table.
    return result.rows; // Returns the retrieved data to be used in other parts of the application.
}

// Calls the function to test if it successfully retrieves data.
obtenerViajes(); 


// Function to insert a new trip into the database
const agregarViaje = async (destino , presupuesto) => {
    
    // SQL query to insert a new record into the "viajes" table.
    const consulta = "INSERT INTO viajes (destino, presupuesto) VALUES ($1, $2)";
    const values = [destino, presupuesto]; // Values to be inserted, using parameterized queries for security.

    // Executes the SQL query with the provided values.
    const result =  await pool.query(consulta, values);

    console.log("Trip added successfully:", result.rowCount); // Logs a success message with the number of rows affected.
}

// Calls the function to add a new trip (for testing purposes).
agregarViaje("Spain", 5000)


// Export functions to make them available for use in other files (e.g., server.js).
module.exports = { obtenerViajes, agregarViaje };
