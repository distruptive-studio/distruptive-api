import mongoose, { Schema } from 'mongoose';
import { ITopic } from '../interfaces/ITopic';

/**
 * Schema definition for the Topic model.
 * 
 * @type {Schema<ITopic>}
 */
const topicSchema = new Schema<ITopic>({
    /**
     * The name of the topic, which is required and must be unique.
     * @type {String}
     */
    name: { type: String, unique: true, required: true },

    /**
     * Permissions for the topic, with default values set to false.
     * @type {Object}
     */
    permission: {
        permiteImagen: { type: Boolean, default: false },
        permiteVideo: { type: Boolean, default: false },
        permiteTexto: { type: Boolean, default: false }
    }
});

/**
 * Topic model based on the topic schema.
 * 
 * @type {mongoose.Model<ITopic>}
 */
export default mongoose.model<ITopic>('Topic', topicSchema);