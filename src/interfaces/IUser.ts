import { Document } from "mongoose";

/**
 * Enum representing the different types of users in the system.
 * 
 * @enum {string}
 */
export enum USER_TYPE {
    /** Represents a regular reader user. */
    LECTOR = 'lector',

    /** Represents a content creator user. */
    CREATOR = 'creator',

    /** Represents an administrative user. */
    ADMIN = 'admin'
}

/**
 * Represents a user in the system.
 * 
 * @interface IUser
 * @extends Document
 */
export interface IUser extends Document {
    /**
     * The username of the user.
     * @type {string}
     */
    username: string;

    /**
     * The email address of the user.
     * @type {string}
     */
    email: string;

    /**
     * The type of user, which can be one of the values from USER_TYPE.
     * @type {USER_TYPE}
     */
    type: USER_TYPE;

    /**
     * The password of the user.
     * @type {string}
     */
    password: string;

    /**
     * The authentication token for the user.
     * @type {string}
     */
    token: string;
}