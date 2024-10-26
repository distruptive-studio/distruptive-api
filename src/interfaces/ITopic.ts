import { Document } from 'mongoose';

/**
 * Represents a topic in the system.
 * 
 * @interface ITopic
 * @extends Document
 */
export interface ITopic extends Document {
    /**
     * The name of the topic.
     * @type {string}
     */
    name: string;

    /**
     * Permissions associated with the topic.
     * 
     * @type {{ validateImagen: boolean; validateVideo: boolean; validateTexto: boolean; }}
     */
    permission: {
        /**
         * Indicates if image validation is allowed.
         * @type {boolean}
         */
        validateImagen: boolean;

        /**
         * Indicates if video validation is allowed.
         * @type {boolean}
         */
        validateVideo: boolean;

        /**
         * Indicates if text validation is allowed.
         * @type {boolean}
         */
        validateTexto: boolean;
    };
}