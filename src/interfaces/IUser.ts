import { Document, ObjectId } from "mongoose";
import { ITopic } from "./ITopic";

/**
 * Enum representing the different types of users in the system.
 * 
 * @enum {string}
 */
export enum ROLES {
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
  type: ROLES;

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

  /**
    * Reference to the topic that defines permissions for this user.
    * This field may be null or undefined if no topic is assigned.
    * @type {ITopic}
    */
  topic: ObjectId;
}