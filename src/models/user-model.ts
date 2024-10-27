import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";


/**
 * Schema definition for the User model.
 * 
 * @type {Schema<IUser>}
 */
const UserSchema = new Schema<IUser>({
    /**
     * The username of the user, which is required and must be unique.
     * @type {String}
     */
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v: string) {
                return !/\s/.test(v); // Verifica que no haya espacios en blanco
            },
            message: props => `${props.value} cannot contain spaces!`
        }
    },

    /**
     * The email address of the user, which is required and must be unique.
     * @type {String}
     */
    email: { type: String, unique: true, required: true },

    /**
     * The type of user, must be one of the specified enum values.
     * @type {String}
     */
    type: { type: String, enum: ['lector', 'creator', 'admin'], required: true },

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

UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.token;
    return userObject;
};
export default mongoose.model<IUser>('User', UserSchema);