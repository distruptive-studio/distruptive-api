import dotenv from 'dotenv';
import { Server } from './config/server';

dotenv.config();

/**
 * Retrieves the Singleton instance of the Server and starts the application.
 */
const server = Server.getInstance();

/**
 * Starts the server and listens on the configured port.
 */
server.listen();
