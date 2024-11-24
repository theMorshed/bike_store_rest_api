// Import necessary modules
import mongoose from "mongoose";  // MongoDB driver for Node.js to interact with MongoDB
import app from "./app";  // The Express app that contains the route and middleware setup
import config from "./app/config";  // Configuration file containing database URL and port

// Main function to connect to MongoDB and start the Express server
const main = async() => {
    try {
        // Connect to MongoDB using the URL from the config file
        await mongoose.connect(config.db_url as string);

        // Once connected to MongoDB, start the Express server on the specified port
        app.listen(config.port, () => {
            console.log(`Server running on port: ${config.port}`);  // Log the port the server is running on
        });
    } catch(error) {
        // If an error occurs (either connecting to MongoDB or starting the server), log it
        console.log(error);
    }
}

// Execute the main function to initialize the server
main();