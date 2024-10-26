import mongoose from "mongoose";
import 'dotenv/config';

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * @async
 * @function dbConnection
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 *
 * @throws {Error} Throws an error if the MongoDB URI is not defined in environment variables
 *                 or if there is a failure during the connection process.
 *
 * @example
 * // Call the dbConnection function to connect to the MongoDB database
 * dbConnection()
 *   .then(() => console.log("Connected to the database"))
 *   .catch(error => console.error("Connection error:", error));
 */
export const dbConnection = async (): Promise<void> => {
    try {
        // Retrieve the MongoDB URI from environment variables
        const uri = process.env.DB_URL;

        // Check if the URI is defined
        if (!uri) {
            throw new Error("MongoDB URI is not defined");
        }

        // Attempt to connect to the MongoDB database
        await mongoose.connect(uri);

        console.log("Database online");
    } catch (error) {
        console.log(error);
        throw new Error("Error when starting the database");
    }
};
