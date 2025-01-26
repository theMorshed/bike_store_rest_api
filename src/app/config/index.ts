// Importing the necessary modules
import dotenv from 'dotenv';  // Module to load environment variables from a .env file
import path from 'path';  // Module to work with file and directory paths

// Load environment variables from a .env file located in the root directory
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Exporting the configuration settings
export default {
    // Server port (from the .env file)
    port: process.env.PORT,

    // MongoDB database URL (from the .env file)
    db_url: process.env.DATABASE_URL,

    // MongoDB database URL (from the .env file)
    NODE_ENV: process.env.NODE_ENV,
}
