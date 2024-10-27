import express, { Express } from 'express';
import { dbConnection } from './db';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { API, ENDPOINTS } from './endpoints';

import AuthRouter from '../routes/auth-routes'
import UserRouter from '../routes/users-routes';
import ContentRouter from '../routes/content-routes'


import { validToken } from '../middlewares/valid-token';
import { validUserAdmin } from '../middlewares/valid-admin';

export class Server {
    private static instance: Server;
    private app: Express;
    private port: string | number;
    private path: { [key: string]: string };

    /**
     * Private constructor for Singleton pattern. Initializes the server instance,
     * connects to the database, and sets up middlewares.
     */
    private constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.path = {
            auth: `${API}${ENDPOINTS.AUTH.BASE}`,
            user: `${API}${ENDPOINTS.USERS.BASE}`,
            content: `${API}${ENDPOINTS.CONTENTS.BASE}`
        };

        this.connectDB();
        this.middlewares();
        this.routes()
    }

    /**
     * Retrieves the Singleton instance of the Server. If it doesn't exist, creates a new one.
     *
     * @returns {Server} The single instance of the Server class.
     */
    public static getInstance(): Server {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }

    /**
     * Connects to the MongoDB database.
     *
     * @private
     * @async
     * @returns {Promise<void>} Resolves when the connection is established successfully.
     */
    private async connectDB() {
        await dbConnection();
    }

    /**
     * Sets up middlewares for the Express application.
     *
     * - CORS for cross-origin resource sharing
     * - Morgan for HTTP request logging
     * - Helmet for security enhancements
     * - JSON and URL-encoded parsers for request body parsing
     * 
     * @private
     */
    private middlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('short'));
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(
        //     fileUpload({
        //         useTempFiles: true,
        //         tempFileDir: "/tmp/",
        //         createParentPath: true,
        //     })
        // );
    }

    routes() {
        this.app.use(this.path.auth, AuthRouter)
        this.app.use(this.path.user, validToken, validUserAdmin, UserRouter)
        this.app.use(this.path.content, validToken, ContentRouter)
        console.log("available routes: ", this.path);
    }

    /**
     * Starts the server, listening on the specified port. 
     * Logs a message indicating the server is running.
     */
    public listen(): void {
        this.app.listen(this.port, () => {

            console.log(`Server running on port ${this.port}`);

        });

        this.app.get('/api', (req, res) => {

            res.send('distruptive-api');

        });
    }
}
