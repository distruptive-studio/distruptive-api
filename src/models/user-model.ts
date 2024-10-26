import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";


/**
 * Schema definition for the User model.
 * 
 * @type {Schema<IUser>}
 */
const userSchema = new Schema<IUser>({
    /**
     * The username of the user, which is required and must be unique.
     * @type {String}
     */
    username: { type: String, unique: true, required: true },

    /**
     * The email address of the user, which is required and must be unique.
     * @type {String}
     */
    email: { type: String, unique: true, required: true },

    /**
     * The type of user, must be one of the specified enum values.
     * @type {String}
     */
    type: { type: String, enum: ['lector', 'creador', 'admin'], required: true },

    /**
     * The password of the user, which is required.
     * @type {String}
     */
    password: { type: String, required: true },

    /**
     * The authentication token for the user, which is optional.
     * @type {String}
     */
    token: { type: String, required: false },
});

/**
 * User model based on the user schema.
 * 
 * @type {mongoose.Model<IUser>}
 */
export default mongoose.model<IUser>('User', userSchema);